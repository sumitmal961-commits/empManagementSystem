import React, { useEffect, useState } from 'react'
import { CreateEmp, UpdateEmpById } from '../api';
import { notify } from '../utils';

function AddEmp({ showModal, setShowModal, fetchEmployees, updateEmpObj }) {

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });

    const resetEmpState = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null
        })
    }

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (updateEmpObj) {
            setUpdateMode(true);
            setEmployee(updateEmpObj)
        }
    }, [updateEmpObj])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setEmployee(prev => ({
            ...prev,
            profileImage: e.target.files[0]
        }));
    };
    // Add / Update Employee--- 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form submission logic here
        console.log('Employee Data :', employee);

        try {
            const { success, message } = updateMode
                ? await UpdateEmpById(employee, employee._id)
                : await CreateEmp(employee);

            if (success) {
                notify(message, 'success');
                handleClose();
                resetEmpState();
                fetchEmployees();
            } else {
                notify(message || 'Failed to save employee', 'error');
            }
            handleClose();
            resetEmpState();
            fetchEmployees();

        } catch (error) {
            notify('Failed to create employee, try again later', 'error')
            console.log(error)
        }

    };


    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <div
            className={`modal fade ${showModal ? 'show d-block' : ''}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addEmpModalLabel"
            aria-hidden={!showModal}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="addEmpModalLabel">
                            {updateMode ? 'Update Employee' : 'Add Employee'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={handleClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={employee.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={employee.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        value={employee.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        className="form-control"
                                        value={employee.department}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Salary</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        className="form-control"
                                        value={employee.salary}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Profile Image</label>
                                    <input
                                        type="file"
                                        name="profileImage"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleFileChange}

                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    {/* Save */}
                                    {updateMode ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmp