import useAuth from 'auth/useAuth';

import ChangeLanguageContainer from './components/ChangeLanguageContainer';
import ChangePasswordContainer from './components/ChangePasswordContainer';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <>
      {!!user && <ChangePasswordContainer />}
      <ChangeLanguageContainer />
    </>
  );
};

export default SettingsPage;
