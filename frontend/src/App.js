// App.js
import React from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import './index.css'; // Make sure to include this for global styling

function App() {
  return (
    <div>
      <StudentForm />
      <StudentTable />
    </div>
  );
}

export default App;
