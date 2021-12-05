import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { TextField, PasswordField } from '../../components/Form/Field';
import Form, { FormActions, FormFields, FormLink, FormTitle } from '../../components/Form';
import * as yup from 'yup';
import useAuth from '../../auth/useAuth';
import { LoginInput } from '../../auth/model';

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('To pole jest wymagane').email('Niepoprawny format'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

const LoginPage = () => {
  const { user, login } = useAuth();
  const onSubmit = async (loginInput: LoginInput) => {
    await login(loginInput);
    console.log('dupa', user);
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Form validationSchema={loginValidationSchema} onSubmit={onSubmit}>
          <FormTitle>Zaloguj się</FormTitle>
          <FormFields>
            <TextField label="Email" name="email" />
            <PasswordField label="Hasło" name="password" />
          </FormFields>
          <FormActions>
            <Button type="submit" variant="contained" size="large">
              Zaloguj się
            </Button>
          </FormActions>
          <FormLink prefix="Nie masz jeszcze konta?" text="Zarejestuj się" to="/register" />
        </Form>
      </FormWrapper>
    </PageWrapper>
  );
};

export default LoginPage;

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
