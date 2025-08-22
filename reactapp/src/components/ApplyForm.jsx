import React, { useState } from 'react';

export default function ApplyForm(){
 const [form, setForm] = useState({name:'', qualification:'', subject:'', experience:'', phoneNumber:''});
 const [errors, setErrors] = useState({});
 const [message, setMessage] = useState('');

 const validate = () => {
  const e = {};
  if(!form.name) e.name = 'Name is required';
  if(!form.qualification) e.qualification = 'Qualification is required';
  if(!form.subject) e.subject = 'Subject is required';
  if(form.experience === '') e.experience = 'Experience is required';
  else if(isNaN(Number(form.experience)) || Number(form.experience) < 0) e.experience = 'Experience must be a valid number or at least 0';
  if(!form.phoneNumber) e.phoneNumber = 'Phone Number is required';
  else if(!/^[0-9]{7,15}$/.test(form.phoneNumber)) e.phoneNumber = 'Invalid phone number format';
  setErrors(e);
  return Object.keys(e).length === 0;
 };

 const handleSubmit = async (ev) => {
  ev.preventDefault();
  setMessage('');
  if(!validate()) return;
  try {
   const res = await fetch('http://localhost:8080/addTutor', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({...form, experience: Number(form.experience)})
   });
   if(res.ok){
    setMessage('Application submitted successfully!');
    setForm({name:'', qualification:'', subject:'', experience:'', phoneNumber:''});
    setErrors({});
   } else {
    const text = await res.text();
    setMessage('Error: ' + text);
   }
  } catch(err){
   setMessage('Error submitting application: ' + err.message);
  }
 };

 return (
  <div>
   <h3>Apply to Become a Tutor</h3>
   <form onSubmit={handleSubmit} noValidate>
    <div>
     <label htmlFor='name'>Name</label><br/>
     <input id='name' value={form.name} onChange=[Error - Invalid formula – unexpected “>” in “>se…”] />
     {errors.name && <div style={{color:'red'}}>{errors.name}</div>}
    </div>
    <div>
     <label htmlFor='qualification'>Qualification</label><br/>
     <input id='qualification' value={form.qualification} onChange=[Error - Invalid formula – unexpected “>” in “>se…”] />
     {errors.qualification && <div style={{color:'red'}}>{errors.qualification}</div>}
    </div>
    <div>
     <label htmlFor='subject'>Subject</label><br/>
     <input id='subject' value={form.subject} onChange=[Error - Invalid formula – unexpected “>” in “>se…”] />
     {errors.subject && <div style={{color:'red'}}>{errors.subject}</div>}
    </div>
    <div>
     <label htmlFor='experience'>Experience (years)</label><br/>
     <input id='experience' value={form.experience} onChange=[Error - Invalid formula – unexpected “>” in “>se…”] />
     {errors.experience && <div style={{color:'red'}}>{errors.experience}</div>}
    </div>
    <div>
     <label htmlFor='phoneNumber'>Phone Number</label><br/>
     <input id='phoneNumber' value={form.phoneNumber} onChange=[Error - Invalid formula – unexpected “>” in “>se…”] />
     {errors.phoneNumber && <div style={{color:'red'}}>{errors.phoneNumber}</div>}
    </div>
    <button type='submit'>Submit Application</button>
   </form>
   {message && <div style={{marginTop:10}}>{message}</div>}
  </div>
 );
}
