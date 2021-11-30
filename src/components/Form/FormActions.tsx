import { styled } from '@mui/system';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormActions = ({ children }: Props) => {
  return <FormActionssWrapper>{children}</FormActionssWrapper>;
};

export default FormActions;

const FormActionssWrapper = styled('div')`
  display: flex;
  flex-direction: row;
`;
