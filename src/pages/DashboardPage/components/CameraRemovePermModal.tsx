import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields } from 'components/Form';
import { PasswordField } from 'components/Form/fields';
import Modal from 'components/common/Modal';

import { removePermCamera } from '../queries';

const removePermValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, 'validation.password-min')
    .max(16, 'validation.password-max')
    .required('validation.required'),
});

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

const CameraRemovePermModal = ({ id, name, open, onClose }: Props) => {
  const { t } = useTranslation();

  const { mutateAsync: removePerm } = useMutation(removePermCamera);
  const queryClient = useQueryClient();

  const [error, setError] = useState(null);

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      setError(null);
      await removePerm({ id, password });
      queryClient.invalidateQueries('getOwnedCameras');
      onClose();
    } catch (err: any) {
      setError(err);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Form validationSchema={removePermValidationSchema} onSubmit={onSubmit}>
        <Card>
          <CardContent>
            <Typography align="center" component="h4" variant="h5">
              {t('dashboard.remove-perm.are-you-sure', { name })}
            </Typography>
            <FormFields>
              <PasswordField label={t('dashboard.remove-perm.password')} name="password" required />
            </FormFields>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" onClick={onClose}>
              {t('no')}
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {t('yes')}
            </Button>
          </CardActions>
        </Card>
      </Form>
      {error && <ErrorAlert error={error} />}
    </Modal>
  );
};

export default CameraRemovePermModal;
