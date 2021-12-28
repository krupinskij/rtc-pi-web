import useAuth from 'auth/useAuth';

import ChangePasswordContainer from './components/ChangePasswordContainer';
import CustomizationContainer from './components/CustomizationContainer';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <>
      {!!user && <ChangePasswordContainer />}
      <CustomizationContainer />
    </>
  );
};

export default SettingsPage;
