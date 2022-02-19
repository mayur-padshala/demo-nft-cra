/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from 'components/Header';
import Button from 'components/Button';
import Divider from 'components/Divider';
import { Controller, useForm } from 'react-hook-form';
import closeIcon from 'assets/img/header-icon-close.svg';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { saveToDraft } from 'store/userSlice';
import AccountCreationProgress from 'components/AccountCreationProgress';
import { RootState } from 'store';
import { accent, blue } from 'utils/colors';
import Input from 'components/Input';
import { post } from 'api/myAwesomeFetch';
import endpoint from 'utils/helpers';
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

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
    font-weight: 500;
    text-align: center;
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
    width: 42px;
    height: 42px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
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
  button: css`
    margin-block-start: 24px;
    min-width: 116px;
  `,
  textLink: css`
    color: #577EDC;
  `,
  divider: css`
    margin-block-start: 30px;
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

function Verification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastDeleted = useRef(null);
  const submitBtn = useRef<HTMLElement>();

  const draft = useSelector((state: RootState) => state.user.draft);

  const mutation = useMutation((data: any) => post(endpoint('verify-code'), data));

  const formSchema = Yup.object().shape([1, 2, 3, 4, 5, 6].reduce((o: any, i) => {
    o[`code-${i}`] = Yup.string()
      .required()
      .matches(/^[0-9]$/);
    return o;
  }, {}));

  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...validationOpt,
  });

  const onSubmit = useCallback((data: any) => {
    mutation.mutate({
      code: Object.values(data).join(''),
      type: draft?.type,
    }, {
      onError: (error: any) => {
        toast(error.message);
      },
      onSuccess: () => {
        dispatch(saveToDraft({
          codeVerified: true,
        }));

        navigate('/create-account', { replace: true });
      },
    });
  }, [draft, mutation, dispatch, navigate]);

  useEffect(() => {
    document.getElementsByName('code-1')[0].focus();
  }, []);

  const handlePaste = useCallback((e: any) => {
    const clipboardData = e.clipboardData?.getData('Text')?.trim();
    const code = parseInt(clipboardData!, 10);
    if (Number.isInteger(code) && `${code}`?.length === 6) {
      `${code}`.split('').forEach((c, i) => {
        setValue(`code-${i + 1}`, c);
        document.getElementsByName(`code-${i + 1}`)[0].setAttribute('value', c);
      });
      setTimeout(() => {
        submitBtn.current?.focus();
      }, 50);
      return false;
    }
    return true;
  }, [setValue, submitBtn.current]);

  const handleKeyDown = useCallback((e) => {
    const isDelete = (e.key === 'Backspace' || e.key === 'Delete');
    if (isDelete) {
      lastDeleted.current = e.target.value;
    }
  }, []);

  const handleKeyUp = useCallback((e: any, inputNumber) => {
    let nextElement: any = null;
    const isDelete = (e.key === 'Backspace' || e.key === 'Delete');
    if (isDelete && lastDeleted.current) {
      lastDeleted.current = null;
      return false;
    }
    const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(e.key) !== -1;
    if (isNumber) {
      setValue(`code-${inputNumber}`, e.key);
      e.target.value = e.key;
    }
    if (isDelete && inputNumber > 1) {
      const elems = document.getElementsByName(`code-${inputNumber - 1}`);
      if (elems.length) {
        // eslint-disable-next-line prefer-destructuring
        nextElement = elems[0];
      }
    } else if (isNumber && inputNumber <= 6) {
      if (inputNumber < 6) {
        const elems = document.getElementsByName(`code-${inputNumber + 1}`);
        if (elems.length) {
          // eslint-disable-next-line prefer-destructuring
          nextElement = elems[0];
        }
      } else {
        setTimeout(() => {
          submitBtn.current!.focus();
        }, 50);
        return true;
      }
    }
    if (nextElement) {
      nextElement.focus();
    }
    return true;
  }, [setValue, submitBtn.current, lastDeleted.current]);

  return (
    <>
      <AccountCreationProgress progress={25} />
      <Header
        mainComponent={(
          <div css={styles.header}>Verification</div>
        )}
        rightIcon={{
          icon: closeIcon,
          onClick: () => {
            navigate(-1);
          },
        }}
      />
      <div css={styles.container}>
        {draft?.type === 'email' && (
          <div css={styles.headingText}>
            We&apos;ve sent a 6-digit verification code to the email address
            <span css={styles.username}>{draft?.username}</span>
          </div>
        )}
        {draft?.type === 'phone' && (
          <div css={styles.headingText}>
            We&apos;ve sent a 6-digit verification code to your phone
            <span css={styles.username}>
              {draft?.username}
            </span>
          </div>
        )}
        <div css={styles.verificationCodeInputsContainer}>
          {[1, 2, 3, 4, 5, 6].map((inputNumber) => (
            <Controller
              key={`code-${inputNumber}`}
              render={
                ({ field }) => (
                  <NumberFormat
                    css={styles.input}
                    customInput={Input}
                    format="#"
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    onKeyUp={(e: any) => handleKeyUp(e, inputNumber)}
                    onValueChange={({ formattedValue }) => {
                      setValue(`code-${inputNumber}`, formattedValue);
                    }}
                    {...field}
                  />
                )
              }
              control={control}
              name={`code-${inputNumber}`}
            />
          ))}
        </div>
        <Button
          ref={submitBtn}
          css={styles.button}
          variant={isValid ? 'primary' : 'disabled'}
          text="Continue"
          loading={mutation.isLoading}
          onClick={handleSubmit(onSubmit)}
        />
        <Divider css={styles.divider} />
        <div css={styles.noCodeText}>
          Didn&apos;t receive your code?
        </div>
        <Button
          variant="text"
          text="Send to a different email address"
          onClick={() => {
            toast('Send to a different email address');
          }}
        />
        <Button
          variant="text"
          text="Resend your code"
          onClick={() => {
            toast('Resend your code ');
          }}
        />
      </div>
    </>
  );
}

export default Verification;
