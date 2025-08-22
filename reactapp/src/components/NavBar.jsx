import React from 'react';
import { Link } from 'react-router-dom';
export default function NavBar(){
 return (
  <nav style={{background:'#222', padding:10, color:'#fff'}}>
   <span style={{fontWeight:'bold', marginRight:20}}>Tutor Application</span>
   <Link className='nav-link' to='/' style={{color:'#fff', marginRight:10}}>Home</Link>
   <Link className='nav-link' to='/getAllTutors' style={{color:'#fff'}}>Tutor Details</Link>
  </nav>
 );
}