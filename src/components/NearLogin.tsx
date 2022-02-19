/** @jsxImportSource @emotion/react */
import { toast } from 'react-toastify';
import { css } from '@emotion/react';
import Button from 'components/Button';

const styles = {
  nearAccountText: css`
    margin-block-start: 30px;
  `,
  button: css`
    margin-block-start: 10px;
  `,
};

function NearLogin() {
  return (
    <>
      <div css={styles.nearAccountText}>
        Already have NEAR account?
      </div>
      <Button
        css={styles.button}
        variant="secondary"
        text="Log in with NEAR"
        onClick={() => {
          toast('Log in with NEAR');
        }}
      />
    </>
  );
}

export default NearLogin;
