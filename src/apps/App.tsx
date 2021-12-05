import React from 'react';

import LayoutApp from './LayoutApp';
import RecoilApp from './RecoilApp';
import RouterApp from './RouterApp';
import RoutesApp from './RoutesApp';
import ThemeApp from './ThemeApp';

const App: React.FC = () => {
  return (
    <RecoilApp>
      <ThemeApp>
        <RouterApp>
          <LayoutApp>
            <RoutesApp />
          </LayoutApp>
        </RouterApp>
      </ThemeApp>
    </RecoilApp>
  );
};

export default App;
