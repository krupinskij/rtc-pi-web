import { Theme } from '@mui/material';
import { styled } from '@mui/system';

export const FormWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    width: clamp(400px, 40%, 700px);
    margin: auto;
  `
);
