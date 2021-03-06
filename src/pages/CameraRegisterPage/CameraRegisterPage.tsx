import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import Card, { CardActions, CardContent } from 'components/Card';
import ErrorAlert from 'components/ErrorAlert';
import Form, { FormFields, FormLink, FormTitle } from 'components/Form';
import { PasswordField, TextField } from 'components/Form/fields';
import Container from 'components/common/Container';
import Modal from 'components/common/Modal';

import CameraCodeBox from './components/CameraCodeBox';
import { CameraRegisterRepeatedInput } from './model';
import { registerCamera } from './queries';

const registerValidationSchema = yup.object().shape({
  name: yup.string().max(50, 'validation.camera-name-max').required('validation.required'),
  password: yup
    .string()
    .min(5, 'validation.password-min')
    .max(16, 'validation.password-max')
    .required('validation.required'),
  repeatPassword: yup
    .string()
    .required('validation.required')
    .oneOf([yup.ref('password')], 'validation.password-no-match'),
});

const CameraRegisterPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [code, setCode] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: register, data: cameraCode } = useMutation(registerCamera);

  const codeFromCameraCode = cameraCode?.code;
  useEffect(() => {
    if (codeFromCameraCode) {
      setCode(codeFromCameraCode);
      setIsModalOpen(true);
    }
  }, [codeFromCameraCode]);

  const onSubmit = async (cameraRRInput: CameraRegisterRepeatedInput) => {
    const { repeatedPassword, ...cameraRInput } = cameraRRInput;
    try {
      setError(null);
      await register(cameraRInput);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      {code && !isModalOpen && (
        <Container>
          <Card>
            <CardContent>
              <CameraCodeBox code={code} />
            </CardContent>
          </Card>
        </Container>
      )}
      <Container>
        <Form validationSchema={registerValidationSchema} onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <FormTitle>{t('camera-register.register-new')}</FormTitle>
              <FormFields>
                <TextField label={t('name')} name="name" multiline required />
                <PasswordField label={t('password')} name="password" required />
                <PasswordField label={t('repeat-password')} name="repeatPassword" required />
              </FormFields>
              <CardActions>
                <Button type="submit" variant="contained" size="large">
                  {t('camera-register.register-new')}
                </Button>
              </CardActions>
            </CardContent>
            <FormLink
              prefix={t('camera-register.add-existing')}
              text={t('camera-register.add')}
              to="/camera/add"
            />
          </Card>
        </Form>
      </Container>
      <Container>{error && <ErrorAlert error={error} />}</Container>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {!!code && (
          <Card>
            <CardContent>
              <CameraCodeBox code={code} />
            </CardContent>
          </Card>
        )}
      </Modal>
    </>
  );
};

export default CameraRegisterPage;
