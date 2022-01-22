/** @jsxImportSource @emotion/react */
import LoadingBar from 'react-top-loading-bar';
import { css } from '@emotion/react';
import { accent } from 'utils/colors';

const styles = {
  progressBarContainer: css`

  `,
  progressBar: css`
    top: 54px;
  `,
};

type ProgressBarProps = {
  progress: number;
}

function AccountCreationProgress({ progress }: ProgressBarProps) {
  return (
    <LoadingBar
      css={styles.progressBar}
      height={3}
      color={accent['2']}
      progress={progress}
    />
  );
}

export default AccountCreationProgress;
