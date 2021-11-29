import { Theme, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';

const LoginPage = () => {
  return (
    <PageWrapper>
      <FormWrapper>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            Zaloguj się
          </Typography>
          <Typography variant="body2">Zaloguj się</Typography>
        </CardContent>
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

const FormWrapper = styled(Card)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
  
    margin: ${theme.spacing(0, 80)};
    color: white;
    background-color: ${theme.palette.grey[800]};
  `
);
