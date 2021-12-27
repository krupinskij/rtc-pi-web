import { Button, Theme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import useAuth from 'auth/useAuth';
import Card, { CardContent } from 'components/Card';
import Container from 'components/common/Container';

const HomePage = () => {
  const { user } = useAuth();
  return (
    <>
      <Container size="large">
        <Card>
          <CardContent>
            <Typography align="center" component="h1" variant="h1" fontWeight={500}>
              RTC<LogoSpan>PI</LogoSpan>
            </Typography>
            <Typography align="center" component="p" variant="h5">
              bottom text
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Container>
        <Card>
          <CardContent direction="row">{!!user ? <AuthSection /> : <NotAuthSection />}</CardContent>
        </Card>
      </Container>
    </>
  );
};

export default HomePage;

const AuthSection = () => (
  <>
    <Typography align="center" component="p" variant="h5">
      Odwiedź
    </Typography>
    <Button variant="contained" size="large" component={ButtonLink} to="/dashboard">
      kamery
    </Button>
  </>
);

const NotAuthSection = () => (
  <>
    <Button variant="contained" size="large" component={ButtonLink} to="/login">
      Zaloguj się
    </Button>
    <Typography align="center" component="p" variant="h5">
      lub
    </Typography>
    <Button variant="contained" size="large" component={ButtonLink} to="/register">
      Zarejestruj
    </Button>
  </>
);

const LogoSpan = styled('span')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    color: ${theme.palette.primary.main}
  `
);

const ButtonLink = styled(Link)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(0, 2)} !important;
  `
);
