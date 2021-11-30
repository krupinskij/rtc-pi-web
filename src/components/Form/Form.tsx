import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Theme } from '@mui/material';
import { styled } from '@mui/system';
import { Form as FinalForm } from 'react-final-form';

interface Props {
  children: React.ReactNode;
  onSubmit: () => void;
}

const Form = ({ children, onSubmit }: Props) => {
  return (
    <FormWrapper>
      <CardContent>
        <FinalForm onSubmit={onSubmit}>
          {(props: any) => <form onSubmit={props.handleSubmit}>{children}</form>}
        </FinalForm>
      </CardContent>
    </FormWrapper>
  );
};

export default Form;

const FormWrapper = styled(Card)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    color: white;
    background-color: ${theme.palette.grey[800]};
  `
);
