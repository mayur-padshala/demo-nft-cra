/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { forwardRef } from 'react';
import { accent } from 'utils/colors';

const styles = {
  input: css`
    padding: 12px 20px;
    background-color: #FCFCFC;
    border: 1px solid #BEBEC2;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;

    &:focus {
      outline-color: ${accent['2']};
    }

    &.error, &.error:focus {
      outline: ${accent['4']} auto 1px;
    }
  `,
};

function TextInput(props: any, ref: React.Ref<any>) {
  return (
    <input
      ref={ref}
      css={styles.input}
      {...props}
    />
  );
}

export default forwardRef(TextInput);
