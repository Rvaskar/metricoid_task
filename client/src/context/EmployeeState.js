// import React from "react";
import { useState } from "react";
import employeeContext from './employeeContext';

const EmployeeState = (props) => {
  const host = "http://localhost:5000";
  const initialState = [];

  const [employees, setEmployees] = useState(initialState); 
  //!get all emp

  const getEmployee = async () => {
    //API Call

    const response = await fetch(`${host}/api/employee/fetchallemployee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json(); 
    // console.log(json);
    setEmployees(json); 
  };

  //!ADD Emp TO DATABASE

  const addEmployee = async (name, email, mobile) => {
    //API Call

    const response = await fetch(`${host}/api/employee/addemployee`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, mobile}),
    });

    const employee = await response.json();
    setEmployees(employees.concat(employee)); //concat use to return new array with the {existing array + new data(array)}



    

  };

  //!DELETE Employee FROM DATABASE
  const deleteEmployee = async (id) => {
    //API Call

    const response = await fetch(`${host}/api/employee/deleteemployee/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // const json = response.json();
    // console.log(json);

    //!Logic to edit in client


    const newEmployees = employees.filter((employee) => {
      return employee._id !== id;
    });
    setEmployees(newEmployees);
  };

  //!EDIT employee IN DATABASE 
  const editEmployee = async (id, name, email, mobile) => {

    //API Call
    
    const response = await fetch(`${host}/api/employee/updateemployee/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, mobile }),
    });
    // const json = await response.json();
    // console.log(json)

    
    let newEmployees = JSON.parse(JSON.stringify(employees))

    //Logic to edit in client

    for (let index = 0; index < newEmployees.length; index++) {
      const element = newEmployees[index];
      if (element._id === id) {
        element.name = name;
        element.email = email;
        element.mobile = mobile;
        break;
      }
    }
    setEmployees(newEmployees);
  };

  return (
    <employeeContext.Provider
      value={{ employees, addEmployee, deleteEmployee, editEmployee, getEmployee }}
    >
      {props.children}
    </employeeContext.Provider>
  );
};

export default EmployeeState;
