/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from 'components/Header';
import Button from 'components/Button';
import Divider from 'components/Divider';
import { useForm } from 'react-hook-form';
import closeIcon from 'assets/img/header-icon-close.svg';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LabelledInput from 'components/LabelledInput';
import FormFieldErrorMessage from 'components/FormFieldErrorMessage';
import NearLogin from 'components/NearLogin';
import AccountCreationProgress from 'components/AccountCreationProgress';
import { saveToDraft } from 'store/userSlice';
import { accent, blue } from 'utils/colors';

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
    padding: 0 4px;
    font-size: 12px;
  `,
  button: css`
    margin-block-start: 24px;
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

function CreateNearAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .matches(/^[a-zA-Z'-\s]+$/, 'Looks like an invalid name.')
      .max(100, 'Name should not be longer than 100 characters'),
    accountID: Yup.string()
      .required('Account ID is required')
      .matches(/^([a-z])+[A-Za-z0-9]+$/, 'Enter a valid Account ID'),
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

  const onSubmit = useCallback((data: any) => {
    dispatch(saveToDraft(data));
    navigate('/set-password', { replace: true });
  }, [dispatch, navigate]);

  return (
    <>
      <AccountCreationProgress progress={50} />
      <Header
        mainComponent={(
          <div css={styles.header}>Create NEAR account</div>
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
          Enter an Account ID to use with your NEAR account.
          Your Account ID will be used for all NEAR operations,
          including sending and receiving assets.
        </div>
        <LabelledInput
          css={styles.input}
          label="Full Name"
          placeholder="Ex. John doe"
          inputClassName={errors.fullName ? 'error' : ''}
          type="text"
          {...register('fullName')}
        />
        <FormFieldErrorMessage show={errors.fullName} text={errors.fullName?.message} />
        <LabelledInput
          css={styles.input}
          label="Account ID"
          placeholder="yourname"
          inputClassName={errors.accountID ? 'error' : ''}
          type="text"
          {...register('accountID')}
        />
        <FormFieldErrorMessage show={errors.accountID} text={errors.accountID?.message} />
        <Button
          css={styles.button}
          variant={isValid ? 'primary' : 'disabled'}
          text="Continue"
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
                window.open('https://terms.nftmakerapp.io/', '_blank');
              }}
            />
            and
            <Button
              css={styles.disclaimerLink}
              variant="text"
              text="Privacy Policy"
              onClick={() => {
                window.open('https://privacy.nftmakerapp.io/', '_blank');
              }}
            />
          </div>
        </div>
        <Divider css={styles.divider} />
        <NearLogin />
      </div>
    </>
  );
}

export default CreateNearAccount;
