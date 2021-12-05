import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setIn } from 'final-form';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';
import { AnyObjectSchema } from 'yup';

interface Props {
  children: React.ReactNode;
  validationSchema: AnyObjectSchema;
  onSubmit: (value: any) => void;
}

const validateFormValues = (schema: AnyObjectSchema) => async (values: any) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err: any) {
    const errors = err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};

const Form = ({ children, validationSchema, onSubmit }: Props) => {
  const validate = validateFormValues(validationSchema);

  return (
    <Card elevation={12}>
      <CardContent>
        <FinalForm validate={validate} onSubmit={onSubmit}>
          {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
        </FinalForm>
      </CardContent>
    </Card>
  );
};

export default Form;
