import { Alert } from '@mui/material';
import { styled } from '@mui/system';

interface Props {
  error: any;
}

const ErrorAlert = ({ error }: Props) => {
  const message = error?.response?.data?.message;
  return (
    <ErrorWrapper severity="error" variant="filled">
      {message}
    </ErrorWrapper>
  );
};

export default ErrorAlert;

const ErrorWrapper = styled(Alert)`
  width: 50%;
  margin: 5px auto;
`;
