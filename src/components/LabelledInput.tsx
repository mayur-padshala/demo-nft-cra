/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { forwardRef } from 'react';
import { text } from 'utils/colors';
import Input from 'components/Input';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  label: css`
    color: ${text['300']};
  `,
  input: css`
    margin-block-start: 10px;
  `,
};

function LabelledInput({
  label, placeholder, className, inputClassName, ...props
}: any, ref: React.Ref<any>) {
  return (
    <div css={styles.container} className={className}>
      <span css={styles.label}>{label}</span>
      <Input
        ref={ref}
        css={styles.input}
        placeholder={placeholder}
        className={inputClassName}
        {...props}
      />
    </div>
  );
}

export default forwardRef(LabelledInput);
