import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormTitle } from 'components/Form';
import { PasswordField } from 'components/Form/fields';
import Container from 'components/common/Container';

import { EditRepeatedUserInput } from '../model';
import { editUser } from '../queries';

const settingsValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(5, 'validation.password-min')
    .max(16, 'validation.password-max')
    .required('validation.required'),
  repeatNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'validation.password-no-match')
    .required('validation.required'),
  password: yup
    .string()
    .min(5, 'validation.password-min')
    .max(16, 'validation.password-max')
    .required('validation.required'),
});

const ChangePasswordContainer = () => {
  const { t } = useTranslation();

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
      <Container>
        <Form validationSchema={settingsValidationSchema} onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <FormTitle>{t('settings.change-password')}</FormTitle>
              <FormFields>
                <PasswordField label={t('new-password')} name="newPassword" required />
                <PasswordField label={t('repeat-new-password')} name="repeatNewPassword" required />
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
  );
};

export default ChangePasswordContainer;
