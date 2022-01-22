/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import listItemIcon from 'assets/img/list-item-icon.svg';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { blue, text as textColor } from 'utils/colors';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 14px;
  `,
  image: css`
    width: 69px;
    height: 69px;
  `,
  details: css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  title: css`
    font-weight: 600;
    font-size: 16px;
    color: ${textColor['200']};
  `,
  caption: css`
    font-weight: 500;
    font-size: 12px;
    margin-block-start: 5px;
    color: ${textColor['300']};
  `,
  users: css`
    font-weight: 500;
    font-size: 12px;
    margin-block-start: 5px;
    color: ${blue['100']};
  `,
  icon: css`
    display: flex;
    align-items: center;
  `,
};

function ExperienceItem({
  title, caption, users, image, slug, className,
}: any) {
  const navigate = useNavigate();
  const clickHandler = useCallback(() => {
    navigate(`/user/experience/${slug}`);
  }, [slug, navigate]);

  return (
    <div css={styles.container} onClick={clickHandler} className={className}>
      <div css={styles.image}>
        <img src={image} alt={title} />
      </div>
      <div css={styles.details}>
        <div css={styles.title}>{title}</div>
        <div css={styles.caption}>{caption}</div>
        <div css={styles.users}>{users}</div>
      </div>
      <div css={styles.icon}>
        <img src={listItemIcon} alt="" />
      </div>
    </div>
  );
}

export default ExperienceItem;
