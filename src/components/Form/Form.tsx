import { setIn } from 'final-form';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';
import { AnyObjectSchema } from 'yup';

interface Props {
  children: React.ReactNode;
  validationSchema?: AnyObjectSchema;
  onSubmit: (value: any) => void;
}

const validateFormValues = (schema: AnyObjectSchema) => async (values: any) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err: any) {
    const errors = err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, {
        message: innerError.message,
        data: innerError.params,
      });
    }, {});

    return errors;
  }
};

const Form = ({ children, validationSchema, onSubmit }: Props) => {
  const validate = validationSchema && validateFormValues(validationSchema);

  return (
    <FinalForm validate={validate} onSubmit={onSubmit}>
      {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
    </FinalForm>
  );
};

export default Form;
