const EmployeeModel = require('../Models/EmployeeModel.');
const fs = require('fs');

const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, department, salary } = req.body;
        const profileImage = req.file?.filename || null;
        
        const employee = new EmployeeModel({ name, email, phone, department, profileImage, salary });

        console.log('----Employee Data----', employee);
        await employee.save();
        res.json({ success: true, message: 'Employee created successfully!' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}

const updateEmployeeById = async (req, res) => {
    try {
        const { name, email, phone, department, salary } = req.body;
        const { id } = req.params;
        let updateData = {
            name, email, phone, department, salary, updateAt: new Date()
        }
        if (req.file) {
            updateData.profileImage = req.file.filename;
        }
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updateEmployee) {
            return res.status(404).json({ success: false, message: 'Employee Not Found' });
        }
        res.json({
            success: true,
            message: 'Employee Updated Successfully!',
            data: updateEmployee
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllEmployee = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;
        let searchCriteria = {}
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i'
                }
            }
        }
        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria)

        const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updateAt: -1 })

        const totalPages = Math.ceil(totalEmployees / limit);

        res.status(201).json({
            message: 'All Employees',
            success: true,
            data: {
                employees: emps,
                pagination: {
                    totalEmployees,
                    currentPage: page,
                    totalPages,
                    pageSize: limit
                }
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err
        });
    }
}


const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findOne({ _id: id });
        res.status(201).json({
            message: "Get Employees Details",
            success: true,
            data: emp
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err
        });
    }
}

const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findByIdAndDelete({ _id: id });
        res.status(201).json({
            message: "Employee Deleted Successfully!",
            success: true,
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err
        });
    }
}

module.exports = { createEmployee, getAllEmployee, getEmployeeById, deleteEmployeeById, updateEmployeeById };
