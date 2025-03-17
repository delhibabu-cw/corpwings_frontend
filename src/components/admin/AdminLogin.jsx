import React, { useState } from 'react';
import './AdminLogin.css'; // Import the CSS file for styling
import { IoMdClose } from 'react-icons/io'; // Import cancel icon from react-icons
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {postSigninApi}  from '../../api-service/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoaderPage from '../loaderPage';



const AdminLogin = ({ onClose }) => {

  const navigate = useNavigate()
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const schema = yup.object().shape({
    email: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    device_id: yup.string().optional(),
    role: yup.string().optional(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data)=>{

    const payload = {
      ...data,
      device_id: '123',
    };

    try {
      setLoading(true)

      const updateApi = await postSigninApi(payload);
        
      if (updateApi?.status === 200) {

        console.log(updateApi);

        localStorage.setItem('access-token', updateApi?.data?.result?.tokens?.accessToken);
        localStorage.setItem('role', btoa(updateApi?.data?.result?.user?.role?.name));
        localStorage.setItem('refreshToken', updateApi?.data?.result?.tokens?.refreshToken);
        localStorage.setItem('userId', updateApi?.data?.result?.user?._id);
        localStorage.setItem('name', updateApi?.data?.result?.user?.fullName);
        
        toast.success(updateApi?.data?.msg);
        onClose()
        navigate('/')
        // window.location.reload()
      } 
    } catch (error) {
      console.error("Failed to login:", error);
      // setError("Failed to login. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://localhost:6000/signin', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name, password }),
  //     });
  //     const data = await response.json();
  //     if (data.success) {
  //       onLoginSuccess();
  //     } else {
  //       alert('Invalid credentials');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <>
    <div className="admin-login-overlay">
      <div className="admin-login-container">
        <IoMdClose className="cancel-icon" onClick={()=>onClose()} />
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              placeholder='Enter UserName'
              {...register('email')}
            />
          </div>
          {errors.email && (<p className="">{errors.email.message}</p>)}
          <div className="second-form-group">
            <label htmlFor="password">Password</label>
           <div className='second-div'>
           <input
           className='second-div-input'
              type={passwordshow1 ? 'text' : 'password'}
              id="password"
              placeholder="Enter Password"
                        {...register('password')}
            />
            <button className='hideShowBtn' type='button'
            onClick={()=>setpasswordshow1(!passwordshow1)}>
              {passwordshow1 ? "Hide" : "Show"}
            </button>
           </div>
          </div>
          {errors.password && (<p className="mt-2">{errors.password.message}</p>)}
          <button className='loginBtn mt-4' type="submit">Login</button>
        </form>
      </div>
    </div>

    {loading && <LoaderPage/>}
    </>
  );
};

export default AdminLogin;
