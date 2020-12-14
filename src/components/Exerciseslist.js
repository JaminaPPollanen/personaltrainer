import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import  Snackbar from '@material-ui/core/Snackbar';
import  Button  from '@material-ui/core/Button';


function Exerciseslist() {
    const [exercises, setExercises] = useState([]);
    const [msg, SetMsg] = useState('');
    const [open, setOpen] = useState(false);
    const gridRef = useRef();

    const getExercises = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setExercises(data)) 
        .then(err => console.log(err))
    }
    console.log(exercises);

    useEffect(() => {
        getExercises();
    }, []);

    const closeSnackbar = () => {
        setOpen(false);
    }
    const deleteExercise = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(_ => gridRef.current.refreshCells({rowNodes: getExercises()}))
            .then(_ => SetMsg('Training was deleted succesfully'))
            .then(_ => setOpen(true))
            .catch(err => console.log(err))
            }
    }

    const columns = [
        {headerName: 'Date', field: 'date', cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm");}, sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true},
        {headerName: '', field: 'customer.lastname', sortable: true, filter: true},
        {
            headerName: '',
            field: 'links',
            cellRendererFramework: params => 
            <Button color="secondary" size="small" onClick={()=> deleteExercise("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}>
                Delete 
            </Button>
        },
      ]

    return(
        <div>
        <h1> Trainings</h1>
        <div className="ag-theme-material" style={{height:'700px', width:'90%', margin:'auto'}}>
           <AgGridReact 
                ref={gridRef}
                suppressCellSelection={true}
                onGridReady={ params => {
                        gridRef.current = params.api
                }}
                columnDefs={columns}
                rowData={exercises}
                pagination={true}
                paginationPageSize={10}
                >
            </AgGridReact>
            <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            message={msg}
            />
        </div>
        </div>
    );

}

export default Exerciseslist;