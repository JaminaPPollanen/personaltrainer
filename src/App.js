import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, {useState} from 'react';
import Exerciseslist from './components/Exerciseslist';


function App() {

  const [value, setValue] = useState('one');
  const handleChange= (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
     <AppBar position="static">
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Customers"/>
                <Tab value="two" label="Trainings"/>
                <Tab value="three" label="Calendar"/>
            </Tabs>
        </AppBar>
        {value ==='one' && <div> <Customerlist/></div>}
        {value ==='two' && <div> <Exerciseslist/></div>}
        {value ==='three' && <div> <h1>Calendar</h1></div>}
        
    </div>
  );
}

export default App;
