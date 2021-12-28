import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import * as yup from 'yup';

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
  const { t } = useTranslation();

  const { user } = useAuth();
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
                  <FormTitle>{t('settings.change-password')}</FormTitle>
                  <FormFields>
                    <PasswordField label={t('new-password')} name="newPassword" required />
                    <PasswordField
                      label={t('repeat-new-password')}
                      name="repeatNewPassword"
                      required
                    />
                    <PasswordField label={t('old-password')} name="password" required />
                  </FormFields>
                </CardContent>
                <CardActions>
                  <Button type="submit" variant="contained" size="large">
                    {t('settings.change-password')}
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
