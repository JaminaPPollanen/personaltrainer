import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content)) 
        .then(err => console.log(err))
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const columns = [
        {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Lastname', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true}, 
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    ]

    return(
        <div>
        <h1> Customers</h1>
        <div className="ag-theme-material" style={{height:'700px', width:'90%', margin:'auto'}}>
           <AgGridReact 
                ref={gridRef}
                suppressCellSelection={true}
                onGridReady={ params => {
                        gridRef.current = params.api
                }}
                columnDefs={columns}
                rowData={customers}
                pagination={true}
                paginationPageSize={10}
                >
            </AgGridReact>
        </div>
        </div>
    );

}

export default Customerlist;