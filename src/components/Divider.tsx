/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = {
  divider: css`
    width: 100%;
    height: 1px;
    background-color: #dfdfe0;
  `,
};

function Divider(props: any) {
  return <div css={styles.divider} {...props} />;
}

export default Divider;
