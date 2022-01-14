import 'axiosConfig';
import React from 'react';

import AuthApp from './AuthApp';
import I18nApp from './I18nApp';
import LayoutApp from './LayoutApp';
import QueryApp from './QueryApp';
import RecoilApp from './RecoilApp';
import RouterApp from './RouterApp';
import RoutesApp from './RoutesApp';
import ThemeApp from './ThemeApp';

const App: React.FC = () => {
  return (
    <I18nApp>
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
    </I18nApp>
  );
};

export default App;
