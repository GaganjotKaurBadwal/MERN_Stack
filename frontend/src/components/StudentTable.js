import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../index.css'; 

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [rollNoToUpdate, setRollNoToUpdate] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: '',
    lastName: '',
    contactNumber: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const handleDelete = async (rollNo) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${rollNo}`);
      setModalMessage('Student record deleted successfully');
      setShowModal(true);
      setStudents(students.filter(student => student.rollNo !== rollNo));
    } catch (error) {
      setModalMessage('Error deleting student record');
      setShowModal(true);
    }
  };

  const handleUpdate = async (rollNo) => {
    if (rollNo && updatedDetails.firstName && updatedDetails.lastName && updatedDetails.contactNumber) {
      try {
        await axios.put(`http://localhost:5000/api/students/${rollNo}`, updatedDetails);
        setModalMessage('Student record updated successfully');
        setShowModal(true);
        setStudents(students.map(student => 
          student.rollNo === rollNo ? { ...student, ...updatedDetails } : student
        ));
        setUpdatedDetails({ firstName: '', lastName: '', contactNumber: '' });
        setIsEditing(false);
      } catch (error) {
        setModalMessage('Error updating student record');
        setShowModal(true);
      }
    } else {
      setModalMessage('Please fill in all fields to update');
      setShowModal(true);
    }
  };

  const startEditing = (student) => {
    setRollNoToUpdate(student.rollNo);
    setUpdatedDetails({
      firstName: student.firstName,
      lastName: student.lastName,
      contactNumber: student.contactNumber
    });
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h2>Student Records</h2>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>
                {isEditing && rollNoToUpdate === student.rollNo ? (
                  <input 
                    type="text" 
                    value={updatedDetails.firstName} 
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, firstName: e.target.value })} 
                  />
                ) : (
                  student.firstName
                )}
              </td>
              <td>
                {isEditing && rollNoToUpdate === student.rollNo ? (
                  <input 
                    type="text" 
                    value={updatedDetails.lastName} 
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, lastName: e.target.value })} 
                  />
                ) : (
                  student.lastName
                )}
              </td>
              <td>
                {isEditing && rollNoToUpdate === student.rollNo ? (
                  <input 
                    type="text" 
                    value={updatedDetails.contactNumber} 
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, contactNumber: e.target.value })} 
                  />
                ) : (
                  student.contactNumber
                )}
              </td>
              <td>
                {isEditing && rollNoToUpdate === student.rollNo ? (
                  <>
                    <button onClick={() => handleUpdate(student.rollNo)}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleDelete(student.rollNo)}>Delete</button>
                    <button onClick={() => startEditing(student)}>Update</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
