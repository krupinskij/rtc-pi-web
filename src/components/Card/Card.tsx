import { Grid, Theme } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/system';

const Card = styled(MuiCard)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(4, 0)};
  `
);

export default Card;
