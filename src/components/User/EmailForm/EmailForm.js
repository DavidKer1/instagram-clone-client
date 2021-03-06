import React from 'react';
import {Form, Button} from "semantic-ui-react"
import "./EmailForm.scss";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
export default function EmailForm({currentEmail,setShowModal,refetch}) {
   const [updateUser] = useMutation(UPDATE_USER);
   
   const formik = useFormik({
      initialValues: {
         email: currentEmail || ""
      },
      validationSchema: Yup.object({
         email: Yup.string().email().required()
      }),
      onSubmit: async (formValue) => {
         try {
            await updateUser({
               variables: {
                  input: {
                     email: formValue.email
                  }
               }
            });
            refetch();
            toast.success ("El email se actualizo correctamente");
            setShowModal(false)
         } catch (error) {
            toast.error("Error al cambiar el email");
            console.log(error);
         }
      }
   })
   return (
      <Form className="email-form" onSubmit={formik.handleSubmit}>
         <Form.Input 
            placeholder="Escribe tu nuevo email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email && true}

         />
         <Button type="submit" className="btn-submit">Actualizar</Button>
      </Form>
   )
}
