import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Modal from 'components/common/Modal';

import { removeCamera } from '../queries';

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

const CameraRemoveModal = ({ id, name, open, onClose }: Props) => {
  const { mutateAsync: remove } = useMutation(removeCamera);
  const queryClient = useQueryClient();

  const [error, setError] = useState('');

  const handleRemove = async () => {
    try {
      setError('');
      await remove(id);
      queryClient.invalidateQueries('getUsedCameras');
      onClose();
    } catch (err: any) {
      setError(err);
    }
  };

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
          <Button variant="contained" color="primary" onClick={handleRemove}>
            Tak
          </Button>
        </CardActions>
      </Card>
      {error && <ErrorAlert error={error} />}
    </Modal>
  );
};

export default CameraRemoveModal;
