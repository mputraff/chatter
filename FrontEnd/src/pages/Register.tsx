import React from 'react'
import Input from '../components/Input';
import ButtonRegister from '../components/Button';

export default function Register() {
  return (
    <>
      <section className="h-svh bg-gray-950">
        <div className="flex h-full items-center justify-center text-white ">
          <form action="" className="w-1/4 h-auto flex flex-col  gap-4">
            <h3 className="text-5xl mb-8">Register</h3>
            <Input icon="fa-solid fa-user" placeholder="Username" type="text" />
            <Input icon="fa-solid fa-phone" placeholder="Phone" type="text" />
            <Input icon="fa-solid fa-envelope" placeholder="Email" type="email" />
            <Input
              icon="fa-solid fa-lock"
              placeholder="Password"
              type="password"
            />
            <p></p>
            <ButtonRegister name={"Register"} />
          </form>
        </div>
      </section>
    </>
  );
}
