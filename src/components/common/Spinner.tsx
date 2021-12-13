import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import ContentBody from './ContentBody';

interface Props {
  isLoading: boolean;
}

const Spinner: React.FC<Props> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <ContentBody>
        <Progress size="large" color="secondary" />
      </ContentBody>
    );
  }

  return <>{children}</>;
};

export default Spinner;

const Progress = styled(CircularProgress)`
  width: 75px;
`;
