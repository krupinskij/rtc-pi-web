import { Button, Theme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import useAuth from 'auth/useAuth';
import ContentBody from 'components/common/ContentBody';
import { ContentWrapper, ContentWrapperWide } from 'components/common/styled';

const HomePage = () => {
  const { user } = useAuth();
  return (
    <>
      <ContentWrapperWide>
        <ContentBody direction="column">
          <Typography align="center" component="h1" variant="h1" fontWeight={500}>
            RTC<LogoSpan>PI</LogoSpan>
          </Typography>
          <Typography align="center" component="p" variant="h5">
            bottom text
          </Typography>
        </ContentBody>
      </ContentWrapperWide>
      <ContentWrapper>{!!user ? <AuthSection /> : <NotAuthSection />}</ContentWrapper>
    </>
  );
};

export default HomePage;

const AuthSection = () => (
  <ContentBody>
    <Typography align="center" component="p" variant="h5">
      Odwiedź
    </Typography>
    <Button variant="contained" size="large" component={ButtonLink} to="/dashboard">
      kamery
    </Button>
  </ContentBody>
);

const NotAuthSection = () => (
  <ContentBody>
    <Button variant="contained" size="large" component={ButtonLink} to="/login">
      Zaloguj się
    </Button>
    <Typography align="center" component="p" variant="h5">
      lub
    </Typography>
    <Button variant="contained" size="large" component={ButtonLink} to="/register">
      Zarejestruj
    </Button>
  </ContentBody>
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
