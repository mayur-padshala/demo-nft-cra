/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { accent } from 'utils/colors';
import searchIcon from 'assets/img/search-input-icon.svg';

const styles = {
  container: css`
    position: relative;
  `,
  input: css`
    position: relative;
    padding: 12px 20px 12px 40px;
    background-color: #F5F5F5;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;

    &:focus {
      outline-color: ${accent['2']};
    }
  `,
  searchIcon: css`
    position: absolute;
    left: 13px;
    top: 13px;
    z-index: 1;
    width: 20px;
    height: 20px;
  `,
};

function SearchInput({ className, ...props }: any) {
  return (
    <div css={styles.container} className={className}>
      <img css={styles.searchIcon} src={searchIcon} alt="Search icon" />
      <input
        css={styles.input}
        {...props}
      />
    </div>
  );
}

export default SearchInput;
