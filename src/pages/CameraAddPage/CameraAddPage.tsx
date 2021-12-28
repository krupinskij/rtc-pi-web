import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/fields';
import Container from 'components/common/Container';

import { CameraAddInput } from './model';
import { addCamera } from './queries';

const addValidationSchema = yup.object().shape({
  code: yup.string().required('validation.required').length(10, 'validation.code-length'),
  password: yup
    .string()
    .min(5, 'validation.password-min')
    .max(16, 'validation.password-max')
    .required('validation.required'),
});

const CameraAddPage = () => {
  const { t } = useTranslation();

  const { mutateAsync: add } = useMutation(addCamera);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const onSubmit = async (cameraAddInput: CameraAddInput) => {
    try {
      setError('');
      await add(cameraAddInput);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <Container>
        <Form validationSchema={addValidationSchema} onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <FormTitle>{t('camera-add.add-existing')}</FormTitle>
              <FormFields>
                <TextField label={t('code')} name="code" required />
                <PasswordField label={t('password')} name="password" required />
              </FormFields>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" size="large">
                {t('camera-add.add')}
              </Button>
            </CardActions>
            <FormLink
              prefix={t('camera-add.register-new')}
              text={t('camera-add.register')}
              to="/camera/register"
            />
          </Card>
        </Form>
      </Container>
      <Container>{error && <ErrorAlert error={error} />}</Container>
    </>
  );
};

export default CameraAddPage;
