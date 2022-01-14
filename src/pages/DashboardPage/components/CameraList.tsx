import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { useTranslation } from 'react-i18next';
>>>>>>> a33584cf79f4ff0a110f6fa055fddbc77a15698d

import Card, { CardContent } from 'components/Card';

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
            <OwnedCameraAction id={camera._id} name={camera.name} />
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
            <UsedCameraAction id={camera._id} name={camera.name} />
          </CameraItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

const NoData = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <Typography align="center" component="p">
          {t('dashboard.list.no-cameras')}
        </Typography>
      </CardContent>
    </Card>
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
