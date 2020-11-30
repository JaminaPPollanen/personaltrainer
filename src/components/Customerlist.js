import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Addcustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import  Button  from '@material-ui/core/Button';
import  Snackbar from '@material-ui/core/Snackbar';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [msg, SetMsg] = useState('');
    const [open, setOpen] = useState(false);

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

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .catch(err => console.log(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => SetMsg('Car was updated succesfully'))
        .then(_ => setOpen(true))
        .catch(err => console.log(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .then(_ => SetMsg('Customer was deleted succesfully'))
            .then(_ => setOpen(true))
            .catch(err => console.log(err))
            }
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const columns = [
        {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Lastname', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true}, 
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field: 'links.[0].href',
            width: 90,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params}/>
        },
        {
            headerName: '',
            field: 'links.[0].href',
            width: 90,
            cellRendererFramework: params => 
            <Button color="secondary" size="small" onClick={()=> deleteCustomer(params.value)}>
                Delete
            </Button>
        }
    ]

    return(
        <div>
        <h1> Customers</h1>
        <Addcustomer addCustomer={addCustomer}/>
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

export default Customerlist;