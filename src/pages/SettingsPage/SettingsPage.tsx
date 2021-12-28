import { Button, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import englishFlagIcon from 'assets/lang/flag-en.svg';
import polishFlagIcon from 'assets/lang/flag-pl.svg';
import useAuth from 'auth/useAuth';
import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormTitle } from 'components/Form';
import { PasswordField, SelectField } from 'components/Form/Field';
import { FieldOption } from 'components/Form/model';
import Container from 'components/common/Container';

import { EditRepeatedUserInput } from './model';
import { editUser } from './queries';

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

const languageOptions: FieldOption[] = [
  {
    value: 'en',
    display: 'settings.language.en',
    icon: englishFlagIcon,
  },
  {
    value: 'pl',
    display: 'settings.language.pl',
    icon: polishFlagIcon,
  },
];

const SettingsPage = () => {
  const { t, i18n } = useTranslation();

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

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
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
      <Container>
        <Form onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <FormTitle>{t('settings.change-language')}</FormTitle>
              <FormFields>
                <SelectField
                  label={t('settings.select-language')}
                  value={i18n.language}
                  options={languageOptions}
                  onChange={handleLanguageChange}
                />
              </FormFields>
            </CardContent>
          </Card>
        </Form>
      </Container>
    </>
  );
};

export default SettingsPage;
