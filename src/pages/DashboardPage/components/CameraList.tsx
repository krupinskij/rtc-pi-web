import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Theme,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import { Camera } from '../model';
import { OwnedCameraAction, UsedCameraAction } from './CameraAction';

interface Props {
  cameras: Camera[];
}

export const OwnedCameraList = ({ cameras }: Props) => {
  if (!cameras.length) {
    return <NoData />;
  }

  return (
    <List>
      {cameras.map((camera) => (
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
  );
};

export const UsedCameraList = ({ cameras }: Props) => {
  if (!cameras.length) {
    return <NoData />;
  }

  return (
    <List>
      {cameras.map((camera) => (
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
  );
};

const NoData = () => {
  return (
    <NoDataWrapper>
      <Typography align="center" component="p">
        Nie masz jeszcze żadnych kamer
      </Typography>
    </NoDataWrapper>
  );
};

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

const NoDataWrapper = styled(Paper)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(4, 0)};
    padding: ${theme.spacing(8, 4)};
  `
);
