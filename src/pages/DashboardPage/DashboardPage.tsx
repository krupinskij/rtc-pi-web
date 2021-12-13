import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { ContentWrapperWide } from 'components/common/styled';

import { OwnedCameraAction, UsedCameraAction } from './components/CameraAction';
import { Camera } from './model';
import { getOwnedCameras } from './queries';

const DashboardPage = () => {
  const { data: ownedCameras } = useQuery<Camera[]>('getOwnedCameras', getOwnedCameras);
  const { data: usedCameras } = useQuery<Camera[]>('getUsedCameras', getOwnedCameras);

  return (
    <>
      <ContentWrapperWide>
        <Typography color="white" variant="h4" component="h2">
          Moje kamery
        </Typography>
        <List>
          {ownedCameras?.map((camera) => (
            <ListItem key={camera._id} component={CameraItemPaper}>
              <ListItemText>
                <Typography variant="h5" component="h3">
                  {camera.name}
                </Typography>
              </ListItemText>
              <CameraItemSecondaryAction>
                <OwnedCameraAction id={camera._id} />
              </CameraItemSecondaryAction>
            </ListItem>
          ))}
        </List>
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
        <List>
          {ownedCameras?.map((camera) => (
            <ListItem key={camera._id} component={CameraItemPaper}>
              <ListItemText>
                <Typography variant="h5" component="h3">
                  {camera.name}
                </Typography>
              </ListItemText>
              <CameraItemSecondaryAction>
                <UsedCameraAction id={camera._id} />
              </CameraItemSecondaryAction>
            </ListItem>
          ))}
        </List>

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

const CameraItemPaper = styled(Paper)`
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const CameraItemSecondaryAction = styled(ListItemSecondaryAction)`
  position: static;
  transform: none;
  margin-top: 5px;
  margin-left: auto;
`;

const ListActions = styled('div')`
  display: flex;
  justify-content: center;
`;
