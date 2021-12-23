import { styled } from '@mui/system';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormFields = ({ children }: Props) => {
  return <FormFieldsWrapper>{children}</FormFieldsWrapper>;
};

export default FormFields;

const FormFieldsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
