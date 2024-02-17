import React, { useContext, useEffect, useRef, useState } from "react";
import employeeContext from "../context/employeeContext";
import "./Employee.css";

import EmpRow from "./EmpRow";

const Employee = (props) => {
  const context = useContext(employeeContext);
  const { employees, getEmployee, editEmployee, addEmployee } = context;

  useEffect(() => {
    getEmployee();
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  

  const [employee, setEmployee] = useState({ name: "", email: "", mobile: "" });

  const [employee1, setEmployee1] = useState({
    id: "",
    ename: "",
    eemail: "",
    emobile: "",
  }); 

  const updateEmployee = (currentEmployee) => {
    ref.current.click();
    setEmployee1({
      id: currentEmployee._id,
      ename: currentEmployee.name,
      eemail: currentEmployee.email,
      emobile: currentEmployee.mobile,
    });
  };

  const handleClick = (e) => {
    editEmployee(
      employee1.id,
      employee1.ename,
      employee1.eemail,
      employee1.emobile
    );
    refClose.current.click();
  };
  const onChange = (e) => {
    
    setEmployee1({ ...employee1, [e.target.name]: e.target.value });
  };
  

  const addref = useRef(null);
  const refAddClose = useRef(null);

  //! Adding employees
  const addingEmployee = (currentEmployee) => {
    addref.current.click();
  };

  const handleClick1 = (e) => {
    //! here e means event
    e.preventDefault(); 
    addEmployee(employee.name, employee.email, employee.mobile); 
    setEmployee({ name: "", email: "", mobile: "" }); 
    refAddClose.current.click();
  };
  const onChange1 = (e) => {
    
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  return (
    <>
      
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade  "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog bg-light">
          <div className="modal-content bg-transparent addContainer">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit data
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              

              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ename"
                    name="ename"
                    value={employee1.ename}
                    aria-describedby="emailHelp"
                    onChange={onChange} //adding onchange event
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eemail"
                    name="eemail"
                    value={employee1.eemail}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emobile"
                    name="emobile"
                    value={employee1.emobile}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* updating form complete  ------------------------------------------------------------------------------- */}

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={addref}
        data-bs-target="#exampleModal1"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade  "
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog bg-light">
          <div className="modal-content bg-transparent addContainer">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Employee
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            

              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={employee.name}
                    aria-describedby="emailHelp"
                    onChange={onChange1} 
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={employee.email}
                    onChange={onChange1}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={employee.mobile}
                    onChange={onChange1}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refAddClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick1}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ADDing form complete  ------------------------------------------------------------------------------- */}

      <div className="container container1 mt-5 bg-white b-4">
        <div className="header my-4">
          <h1>Employee Details</h1>
          <button type="button" onClick={addingEmployee} className="btn btn-info">
            + Add new
          </button>
        </div>
        <div className="main-cont mt-6">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <EmpRow
                    key={employee._id}
                    updateEmployee={updateEmployee}
                    employee={employee}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;
