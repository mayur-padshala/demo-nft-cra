/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import Header from 'components/Header';
import Button from 'components/Button';
import Divider from 'components/Divider';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { saveToDraft } from 'store/userSlice';
import NearLogin from 'components/NearLogin';
import FormFieldErrorMessage from 'components/FormFieldErrorMessage';
import Input from 'components/Input';
import endpoint from 'utils/helpers';
import { post } from 'api/myAwesomeFetch';

const styles = {
  container: css`
    padding: 20px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  tabContainer: css`
    display: flex;
    gap: 4px;
  `,
  tab: css`
    color: #6F6E73;
    font-size: 14px;
    padding: 6px 12px;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
  `,
  tabSelected: css`
    border-color: #6F6E73;
    cursor: default;
  `,
  input: css`
    margin-block-start: 26px;
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
  disclaimerLinksContainer: css`
    display: flex;
    align-items: center;
  `,
  disclaimerLink: css`
    padding: 0 4px;
    font-size: 12px;
  `,
  divider: css`
    margin-block-start: 30px;
  `,
};

const tabs = ['Email', 'Phone'];

function GetStarted() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();

  const mutation = useMutation((data: any) => post(endpoint('send-verification-code'), data));

  const formSchema = Yup.object().shape({
    username: selectedTab === 0 ? Yup.string()
      .required('Email is required')
      .email('Please enter a valid email')
      : Yup.string()
        .required('Phone number  is required')
        .matches(/^\+1 (\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}[-\s][0-9]{4}$/, 'Please enter a valid phone number'),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...validationOpt,
  });

  const onSubmit = useCallback((data: any) => {
    dispatch(saveToDraft({
      ...data,
      type: selectedTab === 0 ? 'email' : 'phone',
    }));
    mutation.mutate(data, {
      onError: (error: any) => {
        toast(error.message);
      },
      onSuccess: async () => {
        navigate('/verification');
      },
    });
  }, [navigate, mutation, selectedTab, dispatch]);

  useEffect(() => {
    setValue('username', '');
    reset();
  }, [setValue, reset, selectedTab]);

  return (
    <>
      <Header />
      <div css={styles.container}>
        <div css={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <div
              key={tab}
              css={[styles.tab, index === selectedTab && styles.tabSelected]}
              onClick={() => setSelectedTab(index)}
            >
              <span>{tab}</span>
            </div>
          ))}
        </div>
        {selectedTab === 0 && (
          <Input
            css={styles.input}
            className={errors.username ? 'error' : ''}
            placeholder="johndoe@gmail.com"
            type="email"
            {...register('username')}
          />
        )}
        {selectedTab === 1 && (
          <Controller
            render={
              ({ field }) => (
                <NumberFormat
                  placeholder="Ex (337) 378 8383"
                  css={styles.input}
                  className={errors.username ? 'error' : ''}
                  customInput={Input}
                  format="+1 (###) ### ####"
                  onValueChange={({ formattedValue }) => {
                    setValue('username', formattedValue);
                  }}
                  {...field}
                />
              )
            }
            control={control}
            name="username"
          />
        )}
        <FormFieldErrorMessage show={errors.username} text={errors.username?.message} />
        <Button
          css={styles.button}
          variant={isValid ? 'primary' : 'disabled'}
          text="Continue"
          loading={mutation.isLoading}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />
        <div css={styles.disclaimer}>
          <div>
            by clicking continue you must agree to near labs
          </div>
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

export default GetStarted;
