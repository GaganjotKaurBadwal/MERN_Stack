import React, { useState } from 'react';
import axios from 'axios';
import './../index.css';

const StudentForm = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.password !== student.confirmPassword) {
      setModalMessage('Passwords do not match');
      setShowModal(true);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/students', student);
      setModalMessage(
        `Student registered successfully!<br />Details:<br />First Name: ${student.firstName}<br />Last Name: ${student.lastName}<br />Roll No: ${student.rollNo}<br />Contact Number: ${student.contactNumber}`
      );
      setShowModal(true);
      setStudent({ firstName: '', lastName: '', rollNo: '', password: '', confirmPassword: '', contactNumber: '' });
    } catch (error) {
      setModalMessage('Error registering student');
      setShowModal(true);
    }
  };

  return (
    <div className="container">
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={student.firstName} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={student.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="Roll No" required />
        <input type="password" name="password" value={student.password} onChange={handleChange} placeholder="Password" required />
        <input type="password" name="confirmPassword" value={student.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
        <input type="text" name="contactNumber" value={student.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
        <button type="submit">Register</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p dangerouslySetInnerHTML={{ __html: modalMessage }}></p>
            <button onClick={() => { setShowModal(false); window.location.reload(); }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
