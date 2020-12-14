import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddExercise(props) {
    const [exercise, setExercise] = useState({date: '', duration: '', activity: ''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setExercise({...exercise, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        const newExercise = {
            ...exercise, date: new Date(exercise.date),
            customer: props.params.data.links[1].href,
            };
        console.log(props);
        props.addExercise(newExercise);
        handleClose();
    }

    return(
       <div>
           <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add exercise
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New customer</DialogTitle>
            <DialogContent>
                <TextField
                 margin="dense"
                 name="date"
                 value={exercise.date}
                 onChange={inputChanged}
                 label="date"
                 fullWidth
                />
                 <TextField
                 margin="dense"
                 name="duration"
                 value={exercise.duration}
                 onChange={inputChanged}
                 label="duration"
                 fullWidth
                />
                 <TextField
                 margin="dense"
                 name="activity"
                 value={exercise.activity}
                 onChange={inputChanged}
                 label="activity"
                 fullWidth
                />
            </DialogContent>
            <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
            </Dialog>
       </div>
    );
}

export default AddExercise;