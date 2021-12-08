import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useMutation, useQueries } from 'react-query';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { RegisterInput } from 'auth/model';
import useAuth from 'auth/useAuth';
import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import { FormWrapper } from 'components/common/styled';

import { CameraCode, CameraRegisterInput, CameraRegisterRepeatedInput } from './model';
import { registerCamera } from './queries';

const registerValidationSchema = yup.object().shape({
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
  const [code, setCode] = useState<CameraCode>();
  const { mutate: register, data: cameraCode } = useMutation(registerCamera);

  useEffect(() => {
    console.log(cameraCode);
  }, [cameraCode]);

  const onSubmit = async (cameraRRInput: CameraRegisterRepeatedInput) => {
    const { repeatedPassword, ...cameraRInput } = cameraRRInput;
    register(cameraRInput);
  };

  return (
    <FormWrapper>
      <Form validationSchema={registerValidationSchema} onSubmit={onSubmit}>
        <FormTitle>Zarejestruj nową kamerę</FormTitle>
        <FormFields>
          <PasswordField label="Hasło" name="password" />
          <PasswordField label="Powtórz hasło" name="repeatPassword" />
        </FormFields>
        <FormActions>
          <Button type="submit" variant="contained" size="large">
            Zarejestruj kamerę
          </Button>
        </FormActions>
        <FormLink prefix="Chcesz dodać istniejącą kamerę?" text="Dodaj kamerę" to="/camera/add" />
      </Form>
    </FormWrapper>
  );
};

export default CameraRegisterPage;