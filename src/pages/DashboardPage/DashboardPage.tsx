import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Container from 'components/common/Container';
import Spinner from 'components/common/Spinner';

import { OwnedCameraList, UsedCameraList } from './components/CameraList';
import { Camera } from './model';
import { getOwnedCameras, getUsedCameras } from './queries';

const DashboardPage = () => {
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
        <Typography color="white" variant="h4" component="h2">
          Moje kamery
        </Typography>
        <Spinner isLoading={isOwnedLoading}>
          <OwnedCameraList cameras={ownedCameras} />
        </Spinner>
        <ListActions>
          <Button variant="contained" size="large" component={Link} to="/camera/register">
            Zarejestruj nową kamerę
          </Button>
        </ListActions>
      </Container>

      <Container size="large">
        <Typography color="white" variant="h4" component="h2">
          Pozostałe kamery
        </Typography>
        <Spinner isLoading={isUsedLoading}>
          <UsedCameraList cameras={usedCameras} />
        </Spinner>
        <ListActions>
          <Button variant="contained" size="large" component={Link} to="/camera/add">
            Dodaj nową kamerę
          </Button>
        </ListActions>
      </Container>
    </>
  );
};

export default DashboardPage;

const ListActions = styled('div')`
  display: flex;
  justify-content: center;
`;
