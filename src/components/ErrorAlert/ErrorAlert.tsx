import { Alert } from '@mui/material';
import { styled } from '@mui/system';

interface Props {
  error: string;
}

const ErrorAlert = ({ error }: Props) => {
  return (
    <ErrorWrapper severity="error" variant="filled">
      {error}
    </ErrorWrapper>
  );
};

export default ErrorAlert;

const ErrorWrapper = styled(Alert)`
  width: 50%;
  margin: 5px auto;
`;
