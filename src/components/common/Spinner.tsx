import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import Card, { CardContent } from 'components/Card';

interface Props {
  isLoading: boolean;
}

const Spinner: React.FC<Props> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Progress size="large" color="secondary" />
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default Spinner;

const Progress = styled(CircularProgress)`
  width: 75px;
`;
