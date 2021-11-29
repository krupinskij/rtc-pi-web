import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <div>Layout</div>
      {children}
    </div>
  );
};

export default Layout;
