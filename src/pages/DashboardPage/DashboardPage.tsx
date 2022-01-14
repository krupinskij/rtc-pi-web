import { Button, Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Container from 'components/common/Container';
import Spinner from 'components/common/Spinner';

import { OwnedCameraList, UsedCameraList } from './components/CameraList';
import { Camera } from './model';
import { getOwnedCameras, getUsedCameras } from './queries';

const DashboardPage = () => {
  const { t } = useTranslation();

  const { data: ownedCameras, isLoading: isOwnedLoading } = useQuery<Camera[]>(
    'getOwnedCameras',
    getOwnedCameras
  );
  const { data: usedCameras, isLoading: isUsedLoading } = useQuery<Camera[]>(
    'getUsedCameras',
    getUsedCameras
  );

  return (
    <>
      <Container size="large">
        <Typography variant="h4" component={ListTitle}>
          {t('dashboard.my-cameras')}
        </Typography>
        <Spinner isLoading={isOwnedLoading}>
          <OwnedCameraList cameras={ownedCameras} />
        </Spinner>
        <ListActions>
          <Button variant="contained" size="large" component={Link} to="/camera/register">
            {t('dashboard.register-new-camera')}
          </Button>
        </ListActions>
      </Container>

      <Container size="large">
        <Typography variant="h4" component={ListTitle}>
          {t('dashboard.used-cameras')}
        </Typography>
        <Spinner isLoading={isUsedLoading}>
          <UsedCameraList cameras={usedCameras} />
        </Spinner>
        <ListActions>
          <Button variant="contained" size="large" component={Link} to="/camera/add">
            {t('dashboard.add-camera')}
          </Button>
        </ListActions>
      </Container>
    </>
  );
};

export default DashboardPage;

const ListTitle = styled('h2')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    color: ${theme.palette.text.primary};
  `
);

const ListActions = styled('div')`
  display: flex;
  justify-content: center;
`;
