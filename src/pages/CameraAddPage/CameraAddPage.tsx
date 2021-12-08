import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { LoginInput } from 'auth/model';
import useAuth from 'auth/useAuth';
import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';

const addValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('To pole jest wymagane')
    .length(8, 'Kod powinien mieć dokładnie 8 znaków'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

const CameraAddPage = () => {
  const onSubmit = async (loginInput: LoginInput) => {
    console.log('Super');
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Form validationSchema={addValidationSchema} onSubmit={onSubmit}>
          <FormTitle>Dodaj istniejącą kamerę</FormTitle>
          <FormFields>
            <TextField label="Kod" name="code" />
            <PasswordField label="Hasło" name="password" />
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
      </FormWrapper>
    </PageWrapper>
  );
};

export default CameraAddPage;

const PageWrapper = styled('main')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(8, 4)};
  `
);

const FormWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(0, 100)};
  `
);
