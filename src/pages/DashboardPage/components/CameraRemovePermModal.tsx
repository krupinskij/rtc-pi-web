import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields } from 'components/Form';
import { PasswordField } from 'components/Form/Field';
import Modal from 'components/common/Modal';

import { removePermCamera } from '../queries';

const removePermValidationSchema = yup.object().shape({
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

const CameraRemovePermModal = ({ id, name, open, onClose }: Props) => {
  const { mutateAsync: removePerm } = useMutation(removePermCamera);
  const queryClient = useQueryClient();

  const [error, setError] = useState('');

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      setError('');
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
            <Typography align="center" component="h4" variant="h6">
              Czy na pewno chcesz usunąć tę kamerę u siebie i u wszystkich, którzy z niej
              korzystają: {name}?
            </Typography>
            <Typography align="center" component="h5" variant="h6">
              Wpisz hasło i potwierdź
            </Typography>
            <FormFields>
              <PasswordField label="Hasło" name="password" required />
            </FormFields>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Nie
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Tak
            </Button>
          </CardActions>
        </Card>
      </Form>
      {error && <ErrorAlert error={error} />}
    </Modal>
  );
};

export default CameraRemovePermModal;
