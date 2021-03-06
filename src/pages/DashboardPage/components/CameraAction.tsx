import ComputerIcon from '@mui/icons-material/Computer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';

import CameraEditModal from './CameraEditModal';
import CameraRemoveModal from './CameraRemoveModal';
import CameraRemovePermModal from './CameraRemovePermModal';

interface Props {
  id: string;
  name: string;
}

export const OwnedCameraAction = ({ id, name }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removePermModalOpen, setRemovePermModalOpen] = useState(false);
  return (
    <>
      <CameraRemovePermModal
        id={id}
        name={name}
        open={removePermModalOpen}
        onClose={() => setRemovePermModalOpen(false)}
      />

      <CameraEditModal
        id={id}
        name={name}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />

      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="secondary" size="small">
            <ComputerIcon />
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setEditModalOpen(true)}
          >
            <EditIcon />
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => setRemovePermModalOpen(true)}
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export const UsedCameraAction = ({ id, name }: Props) => {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  return (
    <>
      <CameraRemoveModal
        id={id}
        name={name}
        open={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
      />

      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="secondary" size="small">
            <ComputerIcon />
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => setRemoveModalOpen(true)}
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
