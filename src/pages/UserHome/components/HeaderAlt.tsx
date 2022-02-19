/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import iconBack from 'assets/img/header-alt-icon-back.svg';
import iconHome from 'assets/img/header-alt-icon-home.svg';
import iconNotifications from 'assets/img/header-alt-icon-notification.svg';
import iconSettings from 'assets/img/header-alt-icon-settings.svg';
import { useNavigate } from 'react-router-dom';

const styles = {
  header: css`
    padding: 16px;
    background-color: #F5F5F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
  `,
  iconsContainer: css`
    display: flex;
    gap: 16px;
  `,
  iconLeft: css`
    width: 20px;
    height: 20px;
    cursor: pointer;
  `,
  iconRight: css`
    width: 26px;
    height: 26px;
    cursor: pointer;
  `,
};

function HeaderAlt() {
  const navigate = useNavigate();
  return (
    <div css={styles.header}>
      <div css={styles.iconsContainer}>
        <img
          css={styles.iconLeft}
          src={iconBack}
          alt="Back"
          onClick={() => navigate(-1)}
        />
        <img
          css={styles.iconLeft}
          src={iconHome}
          alt="Home"
          onClick={() => navigate('/user')}
        />
      </div>
      Dropdown
      <div css={styles.iconsContainer}>
        <img
          css={styles.iconRight}
          src={iconNotifications}
          alt="Notifications"
          onClick={() => navigate('/user/notifications')}
        />
        <img
          css={styles.iconRight}
          src={iconSettings}
          alt="Settings"
          onClick={() => navigate('/user/settings')}
        />
      </div>
    </div>
  );
}

HeaderAlt.defaultProps = {};

export default HeaderAlt;
