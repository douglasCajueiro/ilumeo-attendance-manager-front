import './App.css';
import { useEffect, useState } from 'react';
import { Login } from './components/Login';
import { AttendanceHistory } from './components/AttendanceHistory';

function App() {
  const [isLoggedIn, setLogged] = useState<boolean>(false)

  useEffect(() => {
    const employeeUsername = localStorage.getItem("employeeHistory");
    if(employeeUsername) setLogged(true)
  }, [])

  return (
    <div className="App">
      {isLoggedIn ? <AttendanceHistory /> : <Login />}
    </div>
  );
}


export default App;
