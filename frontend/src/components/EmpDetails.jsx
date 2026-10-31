import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notify } from '../utils';
import { GetEmpById } from '../api';

function EmpDetails() {
    const { id } = useParams()

    const [empDetails, setEmpDetails] = useState({})
    const navigate = useNavigate();

    console.log(id);

    const fetchEmpById = async () => {
        try {
            const { data } = await GetEmpById(id);
            console.log(data);
            setEmpDetails(data);

        } catch (error) {
            notify('Failed to fetch employee, try again later', 'error');
        }
    }

    useEffect(() => {
        fetchEmpById();
    }, [id])

    const { name, email, phone, salary, department, createdAt, profileImage } = empDetails;
    console.log('Profile Image:', profileImage);

    return (
        <>
            <div className="emp-container">
                <div className="emp-card card">
                    <div className="emp-card-header bg-primary text-white text-center">
                        {profileImage ? (
                            <img
                                src={`https://empbackendsystem.onrender.com/uploads/${profileImage}`}
                                alt={name}
                                className="emp-profile-img"
                            />
                        ) : (
                            <div className="emp-placeholder-img">
                                {name?.charAt(0)}
                                {/* {name?.charAt(0) || '?'} */}
                                {/* {name && name.charAt(0)} */}
                            </div>
                        )}
                    </div>

                    <div className="card-body text-center mt-4">
                        <h4 className="card-title mb-0">{name}</h4>
                        <p className="text-muted">{department}</p>

                        <ul className="list-group list-group-flush text-start mt-3">
                            <li className="list-group-item"><i className="bi bi-envelope me-2"></i><strong>Email:</strong> {email}</li>
                            <li className="list-group-item"><i className="bi bi-telephone me-2"></i><strong>Phone:</strong> {phone}</li>
                            <li className="list-group-item"><i className="bi bi-currency-rupee me-2"></i>
                                <strong>Salary:</strong> ₹{salary}</li>
                            <li className="list-group-item"><i className="bi bi-calendar-event me-2"></i><strong>Joined:</strong> {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}</li>
                        </ul>

                        <div className="mt-4 d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-primary" onClick={() => navigate('/employee')}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EmpDetails
