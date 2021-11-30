import React from 'react';
import LayoutApp from './LayoutApp';
import RouterApp from './RouterApp';
import ThemeApp from './ThemeApp';

const App: React.FC = () => {
  return (
    <ThemeApp>
      <LayoutApp>
        <RouterApp />
      </LayoutApp>
    </ThemeApp>
  );
};

export default App;
