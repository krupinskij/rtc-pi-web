import { Button } from '@mui/material';
import * as yup from 'yup';

import { LoginInput } from 'auth/model';
import Form, { FormActions, FormFields, FormLink, FormTitle } from 'components/Form';
import { TextField, PasswordField } from 'components/Form/Field';
import { ContentWrapper } from 'components/common/styled';

const addValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('To pole jest wymagane')
    .length(8, 'Kod powinien mieć dokładnie 8 znaków'),
  password: yup
    .string()
    .min(5, 'Hasło powinno mieć co najmniej 5 znaków')
    .max(16, 'Hasło powinno mieć co najwyżej 16 znaków')
    .required('To pole jest wymagane'),
});

const CameraAddPage = () => {
  const onSubmit = async (loginInput: LoginInput) => {
    console.log('Super');
  };

  return (
    <ContentWrapper>
      <Form validationSchema={addValidationSchema} onSubmit={onSubmit}>
        <FormTitle>Dodaj istniejącą kamerę</FormTitle>
        <FormFields>
          <TextField label="Kod" name="code" />
          <PasswordField label="Hasło" name="password" />
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
  );
};

export default CameraAddPage;
