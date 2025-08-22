import React, { useEffect, useState } from 'react';
export default function DisplayTutor(){
 const [tutors, setTutors] = useState([]);
 const [error, setError] = useState('');
 useEffect(()=>{
  fetch('http://localhost:8080/getAllTutors')
   .then(r=>r.json())
   .then(setTutors)
   .catch(e=>setError('Failed to fetch tutors: '+e.message));
 },[]);
 return (
  <div>
   <h3>Submitted Tutor Applications</h3>
   {error && <div style={{color:'red'}}>[Error - You need to specify the message]</div>}
   <table border='1' cellPadding='6'>
    <thead><tr><th>ID</th><th>Name</th><th>Qualification</th><th>Subject</th><th>Experience</th><th>Phone</th></tr></thead>
    <tbody>
     {tutors.map(t => (
      <tr key={t.id}>
       <td>{t.id}</td>
       <td>{t.name}</td>
       <td>{t.qualification}</td>
       <td>{t.subject}</td>
       <td>{t.experience}</td>
       <td>{t.phoneNumber}</td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
}

