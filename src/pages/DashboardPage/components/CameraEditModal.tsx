import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields } from 'components/Form';
import { PasswordField, TextField } from 'components/Form/Field';
import Modal from 'components/common/Modal';

import { EditRepeatedCameraInput } from '../model';
import { editCamera } from '../queries';

const editValidationSchema = yup.object().shape({
  newName: yup.string().max(50, 'Nazwa kamery powinna mieć co najwyżej 50 znaków'),
  newPassword: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków'),
  repeatNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Hasła nie pasują do siebie'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

const CameraEditModal = ({ id, name, open, onClose }: Props) => {
  const { t } = useTranslation();

  const { mutateAsync: edit } = useMutation(editCamera);
  const queryClient = useQueryClient();

  const [error, setError] = useState('');

  const onSubmit = async (editRepeatedCameraInput: EditRepeatedCameraInput) => {
    try {
      const { repeatNewPassword, ...editCameraInput } = editRepeatedCameraInput;

      setError('');
      await edit({ id, editCameraInput });
      queryClient.invalidateQueries('getOwnedCameras');
      onClose();
    } catch (err: any) {
      setError(err);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Form validationSchema={editValidationSchema} onSubmit={onSubmit}>
        <Card>
          <CardContent>
            <Typography align="center" component="h5" variant="h6">
              {t('dashboard.edit.enter-name-password')}
            </Typography>
            <FormFields>
              <TextField label={t('new-name')} name="newName" value={name} />
              <PasswordField label={t('new-password')} name="newPassword" />
              <PasswordField label={t('repeat-new-password')} name="repeatNewPassword" />
              <PasswordField label={t('old-password')} name="password" required />
            </FormFields>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {t('proceed')}
            </Button>
          </CardActions>
        </Card>
      </Form>
      {error && <ErrorAlert error={error} />}
    </Modal>
  );
};

export default CameraEditModal;
