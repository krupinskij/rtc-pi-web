import ComputerIcon from '@mui/icons-material/Computer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid } from '@mui/material';

interface Props {
  id: string;
}

export const OwnedCameraAction = ({ id }: Props) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item spacing={8}>
        <Button variant="contained" color="secondary" size="small">
          <ComputerIcon />
        </Button>
      </Grid>
      <Grid item spacing={8}>
        <Button variant="contained" color="secondary" size="small">
          <EditIcon />
        </Button>
      </Grid>
      <Grid item spacing={8}>
        <Button variant="contained" color="error" size="small">
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export const UsedCameraAction = ({ id }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item spacing={8}>
        <Button variant="contained" color="secondary" size="small">
          <ComputerIcon />
        </Button>
      </Grid>
      <Grid item spacing={8}>
        <Button variant="contained" color="error" size="small">
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
