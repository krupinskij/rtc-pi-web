import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

import ContentBody from 'components/common/ContentBody';

import { Camera } from '../model';
import { OwnedCameraAction, UsedCameraAction } from './CameraAction';

interface Props {
  cameras?: Camera[];
}

export const OwnedCameraList = ({ cameras }: Props) => {
  if (!cameras?.length) {
    return <NoData />;
  }

  return (
    <List>
      {cameras.map((camera) => (
        <ListItem key={camera._id} component={CameraItemPaper}>
          <ListItemText>
            <Typography variant="h5" component={CameraLink} to={`/camera/${camera._id}`}>
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
  if (!cameras?.length) {
    return <NoData />;
  }

  return (
    <List>
      {cameras.map((camera) => (
        <ListItem key={camera._id} component={CameraItemPaper}>
          <ListItemText>
            <Typography variant="h5" component={CameraLink} to={`/camera/${camera._id}`}>
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
    <ContentBody>
      <Typography align="center" component="p">
        Nie masz jeszcze żadnych kamer
      </Typography>
    </ContentBody>
  );
};

const CameraItemPaper = styled(Paper)`
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const CameraLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CameraItemSecondaryAction = styled(ListItemSecondaryAction)`
  position: static;
  transform: none;
  margin-top: 5px;
  margin-left: auto;
`;
