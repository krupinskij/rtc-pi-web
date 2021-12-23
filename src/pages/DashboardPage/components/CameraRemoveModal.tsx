import { Button, Grid, Typography } from '@mui/material';

import Modal from 'components/Modal';
import { ModalActions, ModalContent } from 'components/Modal/Modal';

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

const CameraRemoveModal = ({ id, name, open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Typography align="center" component="h4" variant="h6">
          Czy na pewno chcesz usunąć u siebie kamerę: {name}?
        </Typography>
      </ModalContent>
      <ModalActions>
        <Grid justifyContent="center" spacing={2} container>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Nie
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Tak
            </Button>
          </Grid>
        </Grid>
      </ModalActions>
    </Modal>
  );
};

export default CameraRemoveModal;
