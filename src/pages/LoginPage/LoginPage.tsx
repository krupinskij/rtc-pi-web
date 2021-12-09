import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { LoginInput } from 'auth/model';
import useAuth from 'auth/useAuth';
import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import { ContentWrapper } from 'components/common/styled';

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('To pole jest wymagane').email('Niepoprawny format'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (loginInput: LoginInput) => {
    await login(loginInput);
    navigate('/dashboard');
  };

  return (
    <ContentWrapper>
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
    </ContentWrapper>
  );
};

export default LoginPage;
