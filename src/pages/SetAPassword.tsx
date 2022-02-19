/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from 'components/Header';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import closeIcon from 'assets/img/header-icon-close.svg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import LabelledInput from 'components/LabelledInput';
import FormFieldErrorMessage from 'components/FormFieldErrorMessage';
import AccountCreationProgress from 'components/AccountCreationProgress';
import { authenticate, deleteDraft } from 'store/userSlice';
import { RootState } from 'store';
import { accent, blue } from 'utils/colors';
import { post } from 'api/myAwesomeFetch';
import endpoint from 'utils/helpers';

const styles = {
  container: css`
    padding: 20px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  headingText: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #808080;
  `,
  username: css`
    margin-block-start: 10px;
    color: ${blue['200']};
  `,
  verificationCodeInputsContainer: css`
    margin-block-start: 26px;
    display: flex;
    gap: 10px;
  `,
  input: css`
    margin-block-start: 24px;
  `,
  disclaimer: css`
    margin-block-start: 20px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6F6E73;
    line-height: 16px;
  `,
  disclaimerLinksContainer: css`
    display: flex;
    align-items: center;
  `,
  disclaimerLink: css`
    padding: 0;
    margin-inline: 4px;
    font-size: 12px;
  `,
  button: css`
    margin-block-start: 24px;
    min-width: 116px;
  `,
  textLink: css`
    color: #577EDC;
  `,
  divider: css`
    margin-block-start: 30px;
    width: 100vw;
  `,
  noCodeText: css`
    margin-block-start: 30px;
    margin-block-end: 10px;
  `,
  errorMessage: css`
    font-size: 12px;
    margin-block-start: 6px;
    color: ${accent['4']};
  `,
  header: css`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
  `,
};

function SetAPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector((state: RootState) => state.user.draft);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password length should be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must and should match'),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...validationOpt,
  });

  const mutation = useMutation((data: any) => post(endpoint('signup'), data));

  const onSubmit = useCallback((data: any) => {
    mutation.mutate({
      accountID: draft.accountID,
      fullName: draft.fullName,
      type: draft.type,
      username: draft.username,
      password: data.paassword,
    }, {
      onError: (error: any) => {
        toast(error.message);
      },
      onSuccess: (response: any) => {
        dispatch(deleteDraft());
        localStorage.removeItem('draft');
        dispatch(authenticate(response.data));
        navigate('/user/dashboard', { replace: true });
      },
    });
  }, [mutation, draft, navigate, dispatch]);

  return (
    <>
      <AccountCreationProgress progress={70} />
      <Header
        mainComponent={(
          <div css={styles.header}>Secure your account</div>
      )}
        rightIcon={{
          icon: closeIcon,
          onClick: () => {
            navigate(-1);
          },
        }}
      />
      <div css={styles.container}>
        <div css={styles.headingText}>
          Keep your apps safe from other with access to your computer.
        </div>
        <LabelledInput
          css={styles.input}
          label="Password"
          placeholder=""
          inputClassName={errors.password ? 'error' : ''}
          type="password"
          {...register('password')}
        />
        <FormFieldErrorMessage show={errors.password} text={errors.password?.message} />
        <LabelledInput
          css={styles.input}
          label="Confirm Password"
          placeholder=""
          inputClassName={errors.confirmPassword ? 'error' : ''}
          type="password"
          {...register('confirmPassword')}
        />
        <FormFieldErrorMessage
          show={errors.confirmPassword}
          text={errors.confirmPassword?.message}
        />
        <Button
          css={styles.button}
          variant={isValid ? 'primary' : 'disabled'}
          text="Continue"
          loading={mutation.isLoading}
          onClick={handleSubmit(onSubmit)}
        />
        <div css={styles.disclaimer}>
          <span>
            By creating a NEAR account, you agree to the NEAR Wallet
          </span>
          <div css={styles.disclaimerLinksContainer}>
            <Button
              css={styles.disclaimerLink}
              variant="text"
              text="Terms & Conditions"
              onClick={() => {
                toast('Terms & Conditions');
              }}
            />
            and
            <Button
              css={styles.disclaimerLink}
              variant="text"
              text="Privacy Policy"
              onClick={() => {
                toast('Privacy Policy');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SetAPassword;
