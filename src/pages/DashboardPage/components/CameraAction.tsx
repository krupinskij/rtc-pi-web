import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { Button, Grid } from '@mui/material';

interface Props {
  id: string;
}

export const OwnedCameraAction = ({ id }: Props) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item spacing={8}>
        <Button variant="contained">
          <ScreenSearchDesktopIcon />
        </Button>
      </Grid>
      <Grid item spacing={8}>
        <Button variant="contained" color="secondary">
          <EditIcon />
        </Button>
      </Grid>
      <Grid item spacing={8}>
        <Button variant="contained" color="error">
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
        <Button variant="contained">
          <ScreenSearchDesktopIcon />
        </Button>
      </Grid>
      <Grid item spacing={8}>
        <Button variant="contained" color="error">
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
