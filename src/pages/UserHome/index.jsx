/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderAlt from 'pages/UserHome/components/HeaderAlt';
import { useEffect } from 'react';

const styles = {
  container: css`
    padding: 12px 16px;
  `,
};

function UserHome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (navigate && location && location.pathname === '/user') {
      navigate('dashboard');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <HeaderAlt />
      <div css={styles.container}>
        <Outlet />
      </div>
    </>
  );
}

export default UserHome;
