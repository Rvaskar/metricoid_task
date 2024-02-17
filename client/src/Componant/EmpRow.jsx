import React, { useContext } from "react";
import employeeContext from '../context/employeeContext'


const EmpRow = (props) => {
    const context = useContext(employeeContext)
    const {deleteEmployee} = context;  
    const { employee, updateEmployee } = props;
  return (
    
      <tr>
              <th scope="row">{employee.name}</th>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>
                <i className="fa-solid fa-pencil my-2 mx-3" onClick={()=>{updateEmployee(employee)}}  ></i>
                <i className="fa-solid fa-trash " onClick={()=>{deleteEmployee(employee._id);}} ></i>
              </td>
            </tr>
   
  )
}

export default EmpRow
