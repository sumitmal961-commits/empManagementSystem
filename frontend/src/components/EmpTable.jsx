import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function EmpTable({ employees, pagination,fetchEmployees,handleUpdateEmp,handleDeleteEmp }) {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];
    const {currentPage, totalPages} = pagination;

    const TableRow = ({ employee }) => {
        return (
            <tr>
                <td>

                    <Link to={`/employee/${employee._id}`} className="text-decoration-none">
                        {employee.name}
                    </Link>

                </td>
                <td className="text-truncate" style={{ maxWidth: '180px' }}>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>
                    <span
                        className="text-warning me-2"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        title="Edit"
                        onClick={()=> handleUpdateEmp(employee)}
                    >
                        <FiEdit3 />
                    </span>
                    <span
                        className="text-danger"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        title="Delete"
                        onClick={()=> handleDeleteEmp(employee)}
                    >
                        <MdDelete />
                    </span>
                </td>
            </tr>
        );
    };

    const pageNumbers = Array.from({length: totalPages}, (_,index)=> index+1);

    const handleNextPage = ()=>{
        if(currentPage < totalPages){
            handlePagination(currentPage + 1)
        }
    }

    const handlePrevPage = ()=>{
        if(currentPage > 1){
            handlePagination(currentPage - 1)
        }
    }

     const handlePagination = (currPage)=>{
        fetchEmployees('',currPage,5);
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped m-0 align-middle">
                <thead className="table-light">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                      {/* <TableRow/> */}
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <TableRow key={emp._id} employee={emp} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="text-center">
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='d-flex justify-content-between align-items-center my-3'>
                    <span className='badge bg-primary'>page {currentPage} of {totalPages} </span>
                    <div>
                        <button 
                        className='btn btn-outline-primary m-2' 
                        onClick={()=>handlePrevPage()}
                        disabled={currentPage === 1}
                         >
                            Previous
                        </button>
                        {
                            pageNumbers.map((page)=>(
                                <button onClick={()=> handlePagination(page)}
                                className={`btn btn-outline-primary me-1 ${currentPage === page? 'active':''}`}
                                >
                                    {page}
                                </button>
                            ))
                        }
                        <button 
                        className='btn btn-outline-primary m-2' 
                        onClick={()=>handleNextPage()}
                        disabled={totalPages === currentPage}
                         >
                            Next
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default EmpTable;