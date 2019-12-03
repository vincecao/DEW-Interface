import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Components/menuComponent/Menu'
import MyNav from './Components/navComponent/MyNav'
import OperationDiv from './Components/operationComponent/OperationDiv'
function App() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <div className='container' style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
      <h1>DEW Interface</h1>
      <div style={{ marginTop: 10 }}>
        <Menu />

      </div>
      <div style={{ flex: 1, marginTop: 10 }}>
        <MyNav />
        <OperationDiv />
      </div>
    </div>
  );
}

export default App;
