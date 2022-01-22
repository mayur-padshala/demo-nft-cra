/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import homeLogo from 'assets/img/header-logo.svg';

const styles = {
  header: css`
    padding: 16px;
    background-color: #F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  rightIcon: css`
    position: absolute;
    right: 0;
    width: 54px;
    height: 54px;
    padding: 16px;
    overflow: hidden;
  `,
};

function Header({ mainComponent, rightIcon }: any) {
  return (
    <div css={styles.header}>
      {mainComponent}
      {rightIcon?.icon && (
        <div css={styles.rightIcon} onClick={rightIcon.onClick}>
          <img src={rightIcon.icon} alt="Icon" />
        </div>
      )}
    </div>
  );
}

Header.defaultProps = {
  mainComponent: (
    <img src={homeLogo} alt="Home" />
  ),
  rightIcon: {
    icon: null,
  },
};

export default Header;
