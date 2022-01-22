/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import coloredIcon from 'assets/img/button-icon-colored.svg';
import whiteIcon from 'assets/img/button-icon-white.svg';
import { RingLoader } from 'react-spinners';
import { accent, blue, text as textColor } from 'utils/colors';

const styles = {
  button: css`
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-weight: 600;
    cursor: pointer;
  `,
  primary: css`
    background-color: ${accent['2']};
  `,
  secondary: css`
    background-color: ${textColor['200']};
  `,
  disabled: css`
    background-color: ${textColor['500']};
    cursor: default;
  `,
  loading: css`
    cursor: wait;
  `,
  ghost: css`
    color: ${accent['2']};
    background-color: transparent;
  `,
  text: css`
    color: ${blue['100']};
    font-weight: 400;
    background-color: transparent;
  `,
  icon: css`
    margin-inline-start: 16px;
    margin-inline-end: -8px;
  `,
};

function Button({
  text, variant, loading, ...props
}: any) {
  return (
    <button
      // @ts-ignore
      css={[styles.button, styles[variant], loading && styles.loading]}
      disabled={loading || variant === 'disabled'}
      {...props}
    >
      {!loading && text}
      {!loading && variant !== 'text' && (
        <img css={styles.icon} src={variant === 'ghost' ? coloredIcon : whiteIcon} alt="Icon on button" />
      )}

      {loading && (
        <RingLoader color={variant !== 'ghost' ? 'white' : accent['2']} loading size={18} />
      )}
    </button>
  );
}

export default Button;
