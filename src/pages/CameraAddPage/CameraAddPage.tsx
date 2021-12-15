import { Button } from '@mui/material';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import ErrorAlert from 'components/ErrorAlert';
import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import { ContentWrapper } from 'components/common/styled';

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
      <ContentWrapper>
        <Form validationSchema={addValidationSchema} onSubmit={onSubmit}>
          <FormTitle>Dodaj istniejącą kamerę</FormTitle>
          <FormFields>
            <TextField label="Kod" name="code" required />
            <PasswordField label="Hasło" name="password" required />
          </FormFields>
          <FormActions>
            <Button type="submit" variant="contained" size="large">
              Dodaj kamerę
            </Button>
          </FormActions>
          <FormLink
            prefix="Chcesz dodać nową kamerę?"
            text="Zarejestruj nową kamerę"
            to="/camera/register"
          />
        </Form>
      </ContentWrapper>
      <ContentWrapper>{error && <ErrorAlert error={error} />}</ContentWrapper>
    </>
  );
};

export default CameraAddPage;
