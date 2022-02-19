/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SearchInput from 'components/SearchInput';
import filterIcon from 'assets/img/home-icon-filter.svg';
import { toast } from 'react-toastify';
import { text as textColor } from 'utils/colors';
import docuSign from 'assets/img/experience-docu-sign.svg';
import defiSwap from 'assets/img/experience-defi-swap.svg';
import categoryExchanges from 'assets/img/category-icon-exchanges.svg';
import categoryGames from 'assets/img/category-icon-game.svg';
import categoryMarketplaces from 'assets/img/category-icon-marketplaces.svg';
import categoryDefi from 'assets/img/category-icon-defi.svg';
import categoryCollectibles from 'assets/img/category-icon-collectibles.svg';
import categoryUtilities from 'assets/img/category-icon-utilities.svg';
import ExperienceItem from 'pages/UserHome/components/ExperienceItem';
import Button from 'components/Button';
import CategoryItem from 'pages/UserHome/components/CategoryItem';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
  `,
  topBar: css`
    display: flex;
    gap: 22px;
    justify-content: space-between;
    position: sticky;
    top: 58px;
    margin: -12px -16px;
    padding: 12px 16px;
    background-color: white;
  `,
  search: css`
    flex: 1;
  `,
  filter: css`
    display: flex;
    padding: 4px;
    align-items: center;
    justify-content: center;
    width: 46px;
    cursor: pointer;
  `,
  body: css`
    flex: 1;
  `,
  header: css`
    font-weight: 600;
    font-size: 16px;
    color: ${textColor['200']};
  `,
  recentExperiences: css`
    display: flex;
    flex-direction: column;
  `,
  popularCategories: css`
    display: flex;
    flex-direction: column;
  `,
  headerContainer: css`
    margin-block-start: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  experienceContainer: css`
    display: flex;
    flex-direction: column;
  `,
  experience: css`
    margin-block-start: 16px;
  `,
  categoriesContainer: css`
    display: grid;
    grid-gap: 14px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  `,
  category: css`
    display: flex;
    flex-direction: column;
  `,
  trendingExperiences: css`
    display: flex;
    flex-direction: column;
  `,
};

const experiences = [{
  title: 'DeFi Swap',
  caption: 'Swap your digital assets',
  users: '+200 users',
  image: defiSwap,
  slug: 'defi-swap',
}, {
  title: 'Docu Sign',
  caption: 'sign your digital assets',
  users: '+1k users',
  image: docuSign,
  slug: 'docu-sign',
}];

const categories = [{
  icon: categoryExchanges,
  title: 'Exchanges',
  color: '#EAEFFF',
  slug: 'exchanges',
}, {
  icon: categoryGames,
  title: 'Games',
  color: '#F5F5F5',
  slug: 'games',
}, {
  icon: categoryMarketplaces,
  title: 'Marketplaces',
  color: '#E2F9F3',
  slug: 'marketplaces',
}, {
  icon: categoryDefi,
  title: 'Defi',
  color: '#FFF3EC',
  slug: 'defi',
}, {
  icon: categoryCollectibles,
  title: 'Collectibles',
  color: '#EBF5FF',
  slug: 'collectibles',
}, {
  icon: categoryUtilities,
  title: 'Utilities',
  color: '#F0EBFF',
  slug: 'utilities',
}];

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div css={styles.container}>
      <div css={styles.topBar}>
        <SearchInput css={styles.search} placeholder="Search experiences" />
        <div
          css={styles.filter}
          onClick={() => {
            toast('Filter');
          }}
        >
          <img src={filterIcon} alt="Filter icon" />
        </div>
      </div>
      <div css={styles.body}>
        <div css={styles.recentExperiences}>
          <div css={styles.headerContainer}>
            <div css={styles.header}>Recent Experiences</div>
          </div>
          <div css={styles.experienceContainer}>
            {experiences.map((e) => (
              <ExperienceItem
                key={e.slug}
                css={styles.experience}
                title={e.title}
                caption={e.caption}
                users={e.users}
                slug={e.slug}
                image={e.image}
              />
            ))}
          </div>
        </div>

        <div css={styles.popularCategories}>
          <div css={styles.headerContainer}>
            <div css={styles.header}>Popular Categories</div>
            <Button
              variant="ghost"
              text="See All"
              onClick={() => {
                navigate('/user/category/all');
              }}
            />
          </div>
          <div css={styles.categoriesContainer}>
            {categories.map((c) => (
              <CategoryItem
                key={c.title}
                title={c.title}
                icon={c.icon}
                color={c.color}
                slug={c.slug}
              />
            ))}
          </div>
        </div>

        <div css={styles.trendingExperiences}>
          <div css={styles.headerContainer}>
            <div css={styles.header}>Trending Experiences</div>
          </div>
          <div css={styles.experienceContainer}>
            {experiences.map((e) => (
              <ExperienceItem
                key={e.slug}
                css={styles.experience}
                title={e.title}
                caption={e.caption}
                users={e.users}
                slug={e.slug}
                image={e.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
