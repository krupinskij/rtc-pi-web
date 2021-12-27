import { Button } from '@mui/material';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { LoginInput } from 'auth/model';
import useAuth from 'auth/useAuth';
import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormTitle } from 'components/Form';
import { PasswordField } from 'components/Form/Field';
import Container from 'components/common/Container';

import { EditRepeatedUserInput } from './model';
import { editUser } from './queries';

const settingsValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
  repeatNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Hasła nie pasują do siebie')
    .required('To pole jest wymagane'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: edit } = useMutation(editUser);

  const [error, setError] = useState('');

  const onSubmit = async (editRepeatedUserInput: EditRepeatedUserInput) => {
    try {
      const { repeatNewPassword, ...editUserInput } = editRepeatedUserInput;

      setError('');
      await edit(editUserInput);
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      {!!user && (
        <>
          <Container>
            <Form validationSchema={settingsValidationSchema} onSubmit={onSubmit}>
              <Card>
                <CardContent>
                  <FormTitle>Zmień hasło</FormTitle>
                  <FormFields>
                    <PasswordField label="Nowe hasło" name="newPassword" required />
                    <PasswordField label="Powtórz nowe hasło" name="repeatNewPassword" required />
                    <PasswordField label="Stare hasło" name="password" required />
                  </FormFields>
                </CardContent>
                <CardActions>
                  <Button type="submit" variant="contained" size="large">
                    Zmień hasło
                  </Button>
                </CardActions>
              </Card>
            </Form>
          </Container>
          <Container>{error && <ErrorAlert error={error} />}</Container>
        </>
      )}
    </>
  );
};

export default SettingsPage;
