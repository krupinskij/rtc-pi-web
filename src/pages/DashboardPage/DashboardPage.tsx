import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { ContentWrapperWide } from 'components/common/styled';

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
            <ListItem
              key={camera._id}
              component={CameraItemPaper}
              secondaryAction={<div>DUPA DUPA</div>}
            >
              <ListItemText>
                <Typography variant="h5" component="h3">
                  {camera.name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </ContentWrapperWide>
      <ContentWrapperWide>
        <Typography color="white" variant="h4" component="h2">
          Pozostałe kamery
        </Typography>
        <List>
          {ownedCameras?.map((camera) => (
            <ListItem
              key={camera._id}
              component={CameraItemPaper}
              secondaryAction={<div>DUPA DUPA</div>}
            >
              <ListItemText>
                <Typography variant="h5" component="h3">
                  {camera.name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </ContentWrapperWide>
    </>
  );
};

export default DashboardPage;

const CameraItemPaper = styled(Paper)`
  margin-bottom: 10px;
`;
