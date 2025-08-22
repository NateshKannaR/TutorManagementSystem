import React from 'react';
import { Link } from 'react-router-dom';
export default function Home(){
 return (
  <main>
   <h2>Welcome to the Tutor Application</h2>
   <p>Join our community of skilled tutors and help students achieve their academic goals!</p>
   <Link to='/apply'>Become a Tutor</Link>
  </main>
 );
}

