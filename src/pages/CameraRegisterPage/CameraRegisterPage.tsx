import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { PasswordField, TextField } from 'components/Form/Field';
import Modal from 'components/Modal';
import { ContentBody, ContentWrapper } from 'components/common/styled';

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
  const [code, setCode] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: register, data: cameraCode } = useMutation(registerCamera);

  useEffect(() => {
    if (cameraCode?.code) {
      setCode(cameraCode.code);
      setIsModalOpen(true);
    }
  }, [cameraCode]);

  const onSubmit = async (cameraRRInput: CameraRegisterRepeatedInput) => {
    const { repeatedPassword, ...cameraRInput } = cameraRRInput;
    register(cameraRInput);
  };

  return (
    <>
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
      {code && !isModalOpen && (
        <ContentWrapper>
          <ContentBody>
            <CameraCodeBox code={code} />
          </ContentBody>
        </ContentWrapper>
      )}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {!!code && <CameraCodeBox code={code} />}
      </Modal>
    </>
  );
};

export default CameraRegisterPage;
