import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Spinner from 'components/common/Spinner';
import { ContentWrapperWide } from 'components/common/styled';

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
      <ContentWrapperWide>
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
      </ContentWrapperWide>

      <ContentWrapperWide>
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
      </ContentWrapperWide>
    </>
  );
};

export default DashboardPage;

const ListActions = styled('div')`
  display: flex;
  justify-content: center;
`;
