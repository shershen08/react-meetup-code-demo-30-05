import React, {useState, useEffect} from 'react';
import { Button, Dropdown, Table } from 'react-bootstrap';

import {DataView} from './DataView'

const loadData = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => console.log(json))
}

const types = ['posts', 'users', 'comments']

function App() {

  //managing the state
  const [data, setData] = useState([]);
  const [callType, setType] = useState('users')

  const URL = 'https://jsonplaceholder.typicode.com/'

  // calling backend API
  useEffect(() => {
    const fetchData = async () => {
      fetch(URL + callType)
      .then(response => response.json())
      .then(json => {
        setData(json)
      })
    }
    fetchData()
    //dependencies
  }, [callType])

  return (
    <div className="App">
        {/* <Button onClick={()=>loadData()}>click me</Button> */}

        <h3>{callType}</h3>
        <Dropdown onSelect={(key) =>  setType(key)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                select type
              </Dropdown.Toggle>

              <Dropdown.Menu>
              { types.map(type => 
                  <Dropdown.Item eventKey={type}>{type}</Dropdown.Item>
                  )}
              </Dropdown.Menu>
        </Dropdown>

        <hr/>

        <DataView data={JSON.stringify(data)}/>

    </div>
  );
}

export default App;
