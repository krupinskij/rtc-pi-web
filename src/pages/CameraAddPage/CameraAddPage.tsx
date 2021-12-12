import { Button } from '@mui/material';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import { ContentWrapper } from 'components/common/styled';

import { CameraAddInput } from './model';
import { addCamera } from './queries';

const addValidationSchema = yup.object().shape({
  code: yup
    .string()
    .required('To pole jest wymagane')
    .length(10, 'Kod powinien mieć dokładnie 10 znaków'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

const CameraAddPage = () => {
  const { mutate: add } = useMutation(addCamera);

  const onSubmit = async (cameraAddInput: CameraAddInput) => {
    add(cameraAddInput);
  };

  return (
    <>
      <ContentWrapper>
        <Form validationSchema={addValidationSchema} onSubmit={onSubmit}>
          <FormTitle>Dodaj istniejącą kamerę</FormTitle>
          <FormFields>
            <TextField label="Kod" name="code" required />
            <PasswordField label="Hasło" name="password" required />
          </FormFields>
          <FormActions>
            <Button type="submit" variant="contained" size="large">
              Dodaj kamerę
            </Button>
          </FormActions>
          <FormLink
            prefix="Chcesz dodać nową kamerę?"
            text="Zarejestruj nową kamerę"
            to="/camera/register"
          />
        </Form>
      </ContentWrapper>
    </>
  );
};

export default CameraAddPage;
