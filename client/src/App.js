import "./App.css";
import Employee from "./Componant/Employee";
import EmployeeState from "./context/EmployeeState";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <EmployeeState>
        <Router>
          <Employee />
        </Router>
      </EmployeeState>
    </>
  );
}

export default App;
