import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { LoginInput } from 'auth/model';
import useAuth from 'auth/useAuth';
import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/fields';
import Container from 'components/common/Container';

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('validation.required').email('validation.email-format'),
  password: yup
    .string()
    .min(5, 'validation.password-min')
    .max(16, 'validation.password-max')
    .required('validation.required'),
});

const LoginPage = () => {
  const { t } = useTranslation();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const onSubmit = async (loginInput: LoginInput) => {
    try {
      setError('');
      await login(loginInput);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <Container>
        <Form validationSchema={loginValidationSchema} onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <FormTitle>{t('login.login')}</FormTitle>
              <FormFields>
                <TextField label={t('email')} name="email" required />
                <PasswordField label={t('password')} name="password" required />
              </FormFields>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" size="large">
                {t('login.login')}
              </Button>
            </CardActions>
            <FormLink
              prefix={t('login.dont-have-account')}
              text={t('login.register')}
              to="/register"
            />
          </Card>
        </Form>
      </Container>
      <Container>{error && <ErrorAlert error={error} />}</Container>
    </>
  );
};

export default LoginPage;
