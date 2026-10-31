import React, { useEffect, useState } from 'react'
import EmpTable from './EmpTable'
import { DeleteEmpById, GetAllEmp } from '../api';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess, notify } from '../utils';
import { ToastContainer } from 'react-toastify';
import AddEmp from './AddEmp';


function EmpManagementApp() {

    const [loggedInUser, setLoggedInUser] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout')
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }



    const [showModal, setShowModal] = useState(false)
    const [updateEmpObj, setUpdateEmpObj] = useState(null);


    const [empData, setEmpData] = useState({
        "employees": [],
        "pagination": {
            "totalEmployees": 0,
            "currentPage": 1,
            "totalPages": 1,
            "pageSize": 5
        }
    });
    const [searchTerm, setSearchTerm] = useState('');

    // const fetchEmployees = async (search = '', page = 1, limit = 5) => {
    //     try {
    //         const { data } = await GetAllEmp(search, page, limit)
    //         console.log(data);
    //         setEmpData(data)

    //     } catch (err) {
    //         console.log('Error', err);
    //     }
    // }

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
    try {
        const result = await GetAllEmp(search, page, limit);
        // console.log('Employee API response:', result);

        if (result?.data && Array.isArray(result.data.employees)) {
            setEmpData(result.data);
        } else {
            console.error('Unexpected employee API response:', result);
        }
    } catch (err) {
        console.error('Error fetching employees:', err);
    }
};

    // console.log('---employee data----', empData);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchEmployees(value);
    };

    useEffect(() => {
        fetchEmployees();
    }, [])

    const handleAddEmp = () => {
        setShowModal(true)
    }

    const handleUpdateEmp = (empObj) => {
        console.log('Update Obj', empObj);
        setUpdateEmpObj(empObj);
        setShowModal(true)

    }

    const handleDeleteEmp = async (emp) => {
        try {
            const { success, message } = await DeleteEmpById(emp._id)
            if (success) {
                notify(message, 'success')
                // handleClose();
                // resetEmpState();
                setTimeout(() => {
                    fetchEmployees();
                }, 2000);
            } else {
                notify(message, 'error')
            }


        } catch (err) {
            console.log('Error', err);
            notify(err, 'error');
        }

    }

    return (
        <>
            <div className="container py-4">
                {/* Header */}
                <div className="row mb-4 align-items-center">
                    <div className="col-md-4 col-sm-12 mb-2 mb-md-0">
                        <h5 className="text-success">Welcome, {loggedInUser}</h5>
                        <button className="btn btn-outline-danger btn-sm mt-2" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                    <div className="col-md-8 col-sm-12 text-md-end text-center">
                        <h2 className="fw-bold">Employee Management App</h2>
                    </div>
                </div>

                {/* Card with Search and Add */}
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="row mb-3 g-2">
                            <div className="col-sm-12 col-md-4">
                                <button className="btn btn-primary w-100"
                                    onClick={() => handleAddEmp()}
                                >
                                    Add Employee
                                </button>
                            </div>
                            <div className="col-sm-12 col-md-8">
                                <input
                                    type="text"
                                    placeholder="Search Employees Name..."
                                    className="form-control"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        {/* Employee Table */}
                        <EmpTable
                            employees={empData.employees}
                            pagination={empData.pagination}
                            handleUpdateEmp={handleUpdateEmp}
                            handleDeleteEmp={handleDeleteEmp}
                        />
                    </div>
                </div>
            </div>
            <AddEmp
                showModal={showModal}
                setShowModal={setShowModal}
                fetchEmployees={fetchEmployees}
                updateEmpObj={updateEmpObj}
            />

            <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />


        </>

    )
}

export default EmpManagementApp