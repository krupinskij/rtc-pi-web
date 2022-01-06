import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { mutateAsync: remove } = useMutation(removeCamera);
  const queryClient = useQueryClient();

  const [error, setError] = useState(null);

  const handleRemove = async () => {
    try {
      setError(null);
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
          <Typography align="center" component="h4" variant="h5">
            {t('dashboard.remove.are-you-sure', { name })}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={onClose}>
            {t('no')}
          </Button>
          <Button variant="contained" color="primary" onClick={handleRemove}>
            {t('yes')}
          </Button>
        </CardActions>
      </Card>
      {error && <ErrorAlert error={error} />}
    </Modal>
  );
};

export default CameraRemoveModal;
