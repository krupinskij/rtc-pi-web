import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import ErrorAlert from 'components/ErrorAlert';
import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { PasswordField, TextField } from 'components/Form/Field';
import Modal from 'components/Modal';
import ContentBody from 'components/common/ContentBody';
import { ContentWrapper } from 'components/common/styled';

import CameraCodeBox from './components/CameraCodeBox';
import { CameraRegisterRepeatedInput } from './model';
import { registerCamera } from './queries';

const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, 'Nazwa kamery powinna mieć co najwyżej 50 znaków')
    .required('To pole jest wymagane'),
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

const CameraRegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
      setError('');
      await register(cameraRInput);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      {code && !isModalOpen && (
        <ContentWrapper>
          <ContentBody>
            <CameraCodeBox code={code} />
          </ContentBody>
        </ContentWrapper>
      )}
      <ContentWrapper>
        <Form validationSchema={registerValidationSchema} onSubmit={onSubmit}>
          <FormTitle>Zarejestruj nową kamerę</FormTitle>
          <FormFields>
            <TextField label="Nazwa kamery" name="name" multiline required />
            <PasswordField label="Hasło" name="password" required />
            <PasswordField label="Powtórz hasło" name="repeatPassword" required />
          </FormFields>
          <FormActions>
            <Button type="submit" variant="contained" size="large">
              Zarejestruj kamerę
            </Button>
          </FormActions>
          <FormLink prefix="Chcesz dodać istniejącą kamerę?" text="Dodaj kamerę" to="/camera/add" />
        </Form>
      </ContentWrapper>
      <ContentWrapper>{error && <ErrorAlert error={error} />}</ContentWrapper>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {!!code && <CameraCodeBox code={code} />}
      </Modal>
    </>
  );
};

export default CameraRegisterPage;
