import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useMutation } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';

import "./LoginForm.scss"
import { LOGIN } from '../../../gql/user';
import { setToken, decodeToken } from '../../../utils/token';
export default function LoginForm() {
   const [error, setError] = useState("")
   const [login] = useMutation(LOGIN)

   const {setUser} = useAuth();
   


   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object({
         email: Yup.string().required("El correo electronico es requerido").email("El correo electronico no es valido"),
         password: Yup.string().required("La contraseña es obligatoria")
      }),
      onSubmit: async (formData) => {
         setError('')
         try {
            const {data:{login: {token}}} = await login({
               variables: {
                  input: formData
               }
            });
            setToken(token);
            setUser(decodeToken(token));
         } catch (error) {
            setError(error.message)
         }
      }
   })
   return (
      <Form className="login-form" onSubmit={formik.handleSubmit}>
         <h2>Entra para ver fotos y videos de tus amigos.</h2>
         <Form.Input 
            type="text"
            placeholder="Correo electronico"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email && true}
            autoComplete="off"
            />
         <Form.Input 
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password && true}

         />
         <Button type="submit" className="btn-submit">Iniciar Sesion</Button>
         <p className="submit-error">
         {
            <span className={` ${error && 'error-form'} submit-error-text`}>Error en el email o contraseña </span>
         }
         </p>
      </Form>
   )
}

function initialValues(){
   return {
      email:"",
      password: ""
   }
}