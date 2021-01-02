import React from 'react';

import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import { useMutation } from "@apollo/client"

import "./RegisterForm.scss";
import { REGISTER } from "../../../gql/user";

export default function RegisterForm(props) {
   const {setShowLogin} = props
   const [register] = useMutation(REGISTER)

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object({
         name: Yup.string().required("El nombre es obligatorio"),
         username: Yup.string().matches(/^[a-zA-Z0-9]*$/, "El nombre de usuario no puede tener espacios").required("El nombre de usuario es obligatorio").min(3,"El usuario debe tener minimo 3 caracteres"),
         email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
         password: Yup.string().required("La contraseña es obligatoria").min(5, "La contraseña debe tener minimo 5 caracteres"),
         repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no son iguales")
      }),
      onSubmit: async(formData, {resetForm}) => {
         try {
            const newUser = formData;
            delete newUser.repeatPassword;
            await register({
               variables: {
                  input: newUser
               }
            })
            toast.success("Usuario registrado correctamente")
            setShowLogin(true)

         } catch (error) {
            toast.error(error.message)
            const {repeatPassword, ...newUser} = formData
            resetForm({values: {...newUser, repeatPassword: ''}});
         }
      }
   })
   return (
      <>
         <h2 className="register-form-title">Registrate para ver fotos y videos de tus amigos</h2>
         <Form className="register-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
               type="text"
               placeholder="Nombre y apellidos"
               name="name"
               autoComplete="off"
               value={formik.values.name}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.name && formik.errors.name && true }
            />
            <Form.Input 
               type="text"
               placeholder="Nombre de usuario"
               name="username"
               autoComplete="off"
               value={formik.values.username}
               onBlur={formik.handleBlur}
               onChange={formik.handleChange}
               error={formik.touched.username && formik.errors.username && true }

            />
            <Form.Input 
               type="text"
               placeholder="Correo electronico"
               name="email"
               autoComplete="off"
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.email && formik.errors.email && true}

            />
            <Form.Input 
               type="password"
               placeholder="Contraseña"
               name="password"
               autoComplete="off"
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.password && formik.errors.password && true}

            />
            <Form.Input 
               type="password"
               placeholder="Repetir contraseña"
               name="repeatPassword"
               autoComplete="off"
               value={formik.values.repeatPassword}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.repeatPassword && formik.errors.repeatPassword && true}
            />
            <Button type="submit" className="btn-submit">Registrarse</Button>

         </Form>  
      </>
   )
}


function initialValues() {
   return {
      name:"",
      username:"",
      email:"",
      password:"",
      repeatPassword:""
   }
}