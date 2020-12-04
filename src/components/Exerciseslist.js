import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import AddExercise from './AddExercise';
import Customerlist from './Customerlist';

function Exerciseslist(props) {

    const [exercises, setExercises] = useState([]);
    const gridRef = useRef();

    const getExercises = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setExercises(data.content)) 
        .then(err => console.log(err))
    }

    useEffect(() => {
        getExercises();
    }, []);

    const addExercise = (newExercise) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newExercise)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getExercises()}))
        .catch(err => console.log(err))
    }

    const columns = [
        {headerName: 'Date', field: 'date', cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm");}, sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Customer', field: 'props.', sortable: true, filter: true}
      ]

    return(
        <div>
        <h1> Trainings</h1>
        <AddExercise addExercise={addExercise}/>
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
        </div>
        </div>
    );

}

export default Exerciseslist;