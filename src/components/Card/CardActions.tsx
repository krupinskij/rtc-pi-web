import { Grid } from '@mui/material';
import MuiCardActions from '@mui/material/CardActions';
import React from 'react';

const CardActions: React.FC = ({ children }) => {
  return (
    <MuiCardActions>
      <Grid justifyContent="center" spacing={2} container>
        {React.Children.map(children, (child) => (
          <Grid item>{child}</Grid>
        ))}
      </Grid>
    </MuiCardActions>
  );
};

export default CardActions;
