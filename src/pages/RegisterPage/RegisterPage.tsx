import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { RegisterInputWithRepeated } from 'auth/model';
import useAuth from 'auth/useAuth';
import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import Container from 'components/common/Container';

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

  const [error, setError] = useState('');

  const onSubmit = async (rrInput: RegisterInputWithRepeated) => {
    const { repeatPassword, ...registerInput } = rrInput;
    try {
      setError('');
      await register(registerInput);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <Container>
        <Form validationSchema={registerValidationSchema} onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <FormTitle>Zarejestruj się</FormTitle>
              <FormFields>
                <TextField label="Nazwa użytkownika" name="username" required />
                <TextField label="Email" name="email" required />
                <PasswordField label="Hasło" name="password" required />
                <PasswordField label="Powtórz hasło" name="repeatPassword" required />
              </FormFields>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" size="large">
                Zarejestruj się
              </Button>
            </CardActions>
            <FormLink prefix="Masz już konto?" text="Zaloguj się" to="/login" />
          </Card>
        </Form>
      </Container>
      <Container>{error && <ErrorAlert error={error} />}</Container>
    </>
  );
};

export default RegisterPage;
