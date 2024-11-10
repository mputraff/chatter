import React from 'react'
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import ButtonLogin from '../components/Button';

export default function Login() {
  return (
    <>
      <section className="h-svh bg-gray-950">
        <div className="flex h-full items-center justify-center text-white ">
          <form action="" className="w-1/4 h-auto flex flex-col  gap-4">
            <h3 className="text-5xl mb-8">Login</h3>
            <Input icon="fa-solid fa-user" placeholder="Username" type="text" />
            <Input icon="fa-solid fa-lock" placeholder="Password" type="password" />
            <p className='text-right'>Forgot Password?</p>
            <ButtonLogin name={"Login"}/>
            <p className='flex gap-1 text-base'>Don't have an  account?<Link to="/register" className='hover:underline transition duration-300'>Register</Link></p>
          </form>
        </div>
      </section>
    </>
  );
}
