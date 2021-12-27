import { Button } from '@mui/material';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import Container from 'components/common/Container';

import { CameraAddInput } from './model';
import { addCamera } from './queries';

const addValidationSchema = yup.object().shape({
  code: yup
    .string()
    .required('To pole jest wymagane')
    .length(10, 'Kod powinien mieć dokładnie 10 znaków'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

const CameraAddPage = () => {
  const { mutateAsync: add } = useMutation(addCamera);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const onSubmit = async (cameraAddInput: CameraAddInput) => {
    try {
      setError('');
      await add(cameraAddInput);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <Container>
        <Form validationSchema={addValidationSchema} onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <FormTitle>Dodaj istniejącą kamerę</FormTitle>
              <FormFields>
                <TextField label="Kod" name="code" required />
                <PasswordField label="Hasło" name="password" required />
              </FormFields>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" size="large">
                Dodaj kamerę
              </Button>
            </CardActions>
            <FormLink
              prefix="Chcesz dodać nową kamerę?"
              text="Zarejestruj nową kamerę"
              to="/camera/register"
            />
          </Card>
        </Form>
      </Container>
      <Container>{error && <ErrorAlert error={error} />}</Container>
    </>
  );
};

export default CameraAddPage;
