/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import backgroundImage from 'assets/img/home-background.svg';
import homeLogo from 'assets/img/home-logo-light.svg';
import nearLogo from 'assets/img/near-logo.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { text } from 'utils/colors';
import { RootState } from 'store';

const styles = {
  container: css`
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: 200%;
    background-position: center;
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  slogan: css`
    font-weight: 500;
    font-size: 15px;
    color: ${text['800']};
    margin-block-start: 16px;
  `,
  footer: css`
    position: absolute;
    bottom: 34px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  poweredBy: css`
    font-weight: 500;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.9);
    margin-block-end: 16px;
  `,
};

export default function Splash() {
  const navigate = useNavigate();
  const accountID = useSelector((state: RootState) => state.user.accountID);

  useEffect(() => {
    setTimeout(() => {
      navigate(accountID ? '/user/dashboard' : '/get-started', { replace: true });
    }, 3000);
  }, [navigate, accountID]);

  return (
    <div css={styles.container}>
      <img src={homeLogo} alt="Logo Light" />
      <div css={styles.slogan}>a web3 gateway to hidden experiences</div>

      <div css={styles.footer}>
        <div css={styles.poweredBy}>powered by</div>
        <img src={nearLogo} alt="Near Logo" />
      </div>
    </div>
  );
}
