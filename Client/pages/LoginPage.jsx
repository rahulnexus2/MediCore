import React from 'react'
import {useForm} from "react-hook-form"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit=(data)=>{
    console.log("Form Data :", data);
    
  }



  return (
   <>
   <form onSubmit={handleSubmit(submit)}>
    <input {...register('email', )} type="text" />
    <input type="text" />

    <button type='submit'></button>





   </form>
   </>
  )
}

export defa>ult LoginPage
