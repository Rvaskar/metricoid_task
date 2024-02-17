const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { body, validationResult } = require('express-validator'); 



//! ROUTE1: CREATING ENDPOINT FOR GETTING  ALL THE Employees



router.get('/fetchallemployee', async(req, res)=>{
    try {
      // Fetch all employees from the database
      const employees = await Employee.find();
      res.json(employees);
      
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever Error.")
    }

})

//! ROUTE2: CREATING ENDPOINT FOR ADDING employees IN DATABASE

router.post('/addemployee',[
  body('name','Enter valid title').isLength({ min: 3 }),
  body('email','description at least 5 characters').isLength({ min: 5 }),
  body('number','mobile length must be 10 digit').isLength({ max: 10 }),

  ], async(req, res)=>{
      try {
        const {name, email, mobile} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const employee = new Employee({
          name, email, mobile
        })

        const savedEmployee = await employee.save()

        res.json(savedEmployee)

    } catch (error) {
      
        console.error(error.message);
        res.status(500).send("Internal Sever Error.")
    }

  })

//! ROUTE3: CREATING ENDPOINT FOR UPDATING EXISTING  Employee IN DATABASE

  router.put('/updateemployee/:id',async(req, res)=>{

    try {

        const {name, email, mobile} = req.body;

        const newEmployee = {};
        if(name){newEmployee.name = name};
        if(email){newEmployee.email = email};
        if(mobile){newEmployee.mobile = mobile};

        let employee = await Employee.findById(req.params.id)

        if(!employee){
          return res.status(401).send("Not found")
        }
        employee = await Employee.findByIdAndUpdate(req.params.id, {$set : newEmployee}, {new:true});

        res.json({employee});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error ")
      }

    })


//! ROUTE4: CREATING ENDPOINT FOR DELETING EXISTING  Employee details IN DATABASE


  router.delete('/deleteemployee/:id', async(req, res)=>{
    try {

        let employee = await Employee.findById(req.params.id)

        if(!employee){
          return res.status(401).send("Not found")
        }

        employee = await Employee.findByIdAndDelete(req.params.id);

        res.json({"success" : "record has been deleted", employee: employee});

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error ")
      }
    })



module.exports = router