import 'axiosConfig';
import React from 'react';

import AuthApp from './AuthApp';
import LayoutApp from './LayoutApp';
import RecoilApp from './RecoilApp';
import RouterApp from './RouterApp';
import RoutesApp from './RoutesApp';
import ThemeApp from './ThemeApp';

const App: React.FC = () => {
  return (
    <RecoilApp>
      <ThemeApp>
        <AuthApp>
          <RouterApp>
            <LayoutApp>
              <RoutesApp />
            </LayoutApp>
          </RouterApp>
        </AuthApp>
      </ThemeApp>
    </RecoilApp>
  );
};

export default App;
