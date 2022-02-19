/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import listItemIcon from 'assets/img/list-item-icon.svg';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: (color: string) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    width: 100%;
    background-color: ${color};
    border-radius: 6px;
    cursor: pointer;
  `,
  image: css`
    width: 35px;
    height: 35px;
  `,
  titleContainer: css`
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-block-start: 16px;
  `,
  title: css`
    font-weight: 600;
    font-size: 15px;
    color: rgba(51, 55, 59, 0.7);
  `,
  icon: css`
    display: flex;
    align-items: center;
    width: 6px;
    height: 10px;
  `,
};

function CategoryItem({
  title, icon, color, slug, className,
}: any) {
  const navigate = useNavigate();
  const clickHandler = useCallback(() => {
    navigate(`/user/category/${slug}`);
  }, [slug, navigate]);

  return (
    <div css={styles.container(color)} onClick={clickHandler} className={className}>
      <div css={styles.image}>
        <img src={icon} alt={title} />
      </div>
      <div css={styles.titleContainer}>
        <div css={styles.title}>{title}</div>
        <img css={styles.icon} src={listItemIcon} alt="" />
      </div>
    </div>
  );
}

export default CategoryItem;
