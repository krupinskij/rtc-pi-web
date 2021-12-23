import { Button, Typography } from '@mui/material';

import Card, { CardActions, CardContent } from 'components/Card';
import Modal from 'components/common/Modal';

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

const CameraRemoveModal = ({ id, name, open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card>
        <CardContent>
          <Typography align="center" component="h4" variant="h6">
            Czy na pewno chcesz usunąć u siebie kamerę: {name}?
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Nie
          </Button>
          <Button variant="contained" color="primary">
            Tak
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default CameraRemoveModal;
