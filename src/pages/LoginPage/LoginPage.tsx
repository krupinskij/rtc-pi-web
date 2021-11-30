import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { TextField, PasswordField } from '../../components/Form/Field';
import Form, { FormActions, FormFields, FormLink, FormTitle } from '../../components/Form';

const LoginPage = () => {
  const onSubmit = () => {
    console.log('Submit');
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
          <FormTitle>Zaloguj się</FormTitle>
          <FormFields>
            <TextField label="Login" name="field1" />
            <PasswordField label="Hasło" name="field2" />
          </FormFields>
          <FormActions>
            <Button type="submit" variant="contained" size="large">
              Zaloguj się
            </Button>
          </FormActions>
          <FormLink prefix="Nie masz jeszcze konta?" text="Zarejestuj się" to="/register" />
        </Form>
      </FormWrapper>
    </PageWrapper>
  );
};

export default LoginPage;

const PageWrapper = styled('main')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(8, 4)};
  `
);

const FormWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(0, 100)};
  `
);
