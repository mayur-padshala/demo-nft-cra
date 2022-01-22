/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { accent } from 'utils/colors';

const styles = {
  container: css`
    font-size: 12px;
    margin-block-start: 6px;
    color: ${accent['4']};
    align-self: flex-start;
  `,
};

function FormFieldErrorMessage({ show, text, className }: any) {
  return show ? (
    <div css={styles.container} className={className}>{text}</div>
  ) : null;
}

export default FormFieldErrorMessage;
