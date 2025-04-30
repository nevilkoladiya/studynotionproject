import React from 'react'
import Template from '../components/core/Auth/Template'
import signinimg from '../assets/Images/signup.png'

const Signup = ({setlogin}) => {
  return (
    <div className='w-11/12 mt-14 max-w-maxContent mx-auto'>
    <Template
    title="Join the millions learning to code with StudyNotaion for free"
    formtype="signup"
    setlogin={setlogin}
    image={signinimg}
    ></Template></div>
  )
}

export default Signup