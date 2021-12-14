import 'axiosConfig';
import React from 'react';

import AuthApp from './AuthApp';
import LayoutApp from './LayoutApp';
import QueryApp from './QueryApp';
import RecoilApp from './RecoilApp';
import RouterApp from './RouterApp';
import RoutesApp from './RoutesApp';
import ThemeApp from './ThemeApp';

const App: React.FC = () => {
  return (
    <RecoilApp>
      <QueryApp>
        <ThemeApp>
          <RouterApp>
            <AuthApp>
              <LayoutApp>
                <RoutesApp />
              </LayoutApp>
            </AuthApp>
          </RouterApp>
        </ThemeApp>
      </QueryApp>
    </RecoilApp>
  );
};

export default App;
