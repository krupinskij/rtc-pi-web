import React from 'react';
import LayoutApp from './LayoutApp';
import RouterApp from './RouterApp';
import RoutesApp from './RoutesApp';
import ThemeApp from './ThemeApp';

const App: React.FC = () => {
  return (
    <ThemeApp>
      <RouterApp>
        <LayoutApp>
          <RoutesApp />
        </LayoutApp>
      </RouterApp>
    </ThemeApp>
  );
};

export default App;
