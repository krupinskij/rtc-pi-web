import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilApp: React.FC = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilApp;
