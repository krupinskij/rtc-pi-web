import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { RegisterInput } from 'auth/model';
import useAuth from 'auth/useAuth';
import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import { ContentWrapper } from 'components/common/styled';

const registerValidationSchema = yup.object().shape({
  username: yup.string().required('To pole jest wymagane'),
  email: yup.string().required('To pole jest wymagane').email('Niepoprawny format'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
  repeatPassword: yup
    .string()
    .required('To pole jest wymagane')
    .oneOf([yup.ref('password')], 'Hasła nie pasują do siebie'),
});

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (registerInput: RegisterInput) => {
    await register(registerInput);
    navigate('/dashboard');
  };

  return (
    <ContentWrapper>
      <Form validationSchema={registerValidationSchema} onSubmit={onSubmit}>
        <FormTitle>Zarejestruj się</FormTitle>
        <FormFields>
          <TextField label="Nazwa użytkownika" name="username" />
          <TextField label="Email" name="email" />
          <PasswordField label="Hasło" name="password" />
          <PasswordField label="Powtórz hasło" name="repeatPassword" />
        </FormFields>
        <FormActions>
          <Button type="submit" variant="contained" size="large">
            Zarejestruj się
          </Button>
        </FormActions>
        <FormLink prefix="Masz już konto?" text="Zaloguj się" to="/login" />
      </Form>
    </ContentWrapper>
  );
};

export default RegisterPage;
