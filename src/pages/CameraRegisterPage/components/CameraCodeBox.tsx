import { Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface Props {
  code: string;
}

const CameraCodeBox = ({ code }: Props) => {
  return (
    <>
      <Typography align="center">To jest kod kamery</Typography>
      <CameraCodeLabel align="center" variant="h2">
        {code}
      </CameraCodeLabel>
    </>
  );
};

export default CameraCodeBox;

const CameraCodeLabel = styled(Typography)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    background-color: ${theme.palette.background.default};
    border-radius: ${theme.shape.borderRadius}px;
    margin: ${theme.spacing(4, 0)};
    padding: ${theme.spacing(2, 0)};
  `
);
