import React from 'react'
import "./PasswordForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';

export default function PasswordForm({logout}) {
   const [updateUser] = useMutation(UPDATE_USER);
   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object({
         currentPassword: Yup.string().required(),
         newPassword: Yup.string().required(),
         repeatNewPassword: Yup.string().required().oneOf([Yup.ref("newPassword")])
      }),
      onSubmit: async (formValue) => {
         try {
            const result = await updateUser({
               variables: {
                  input: {
                     currentPassword: formValue.currentPassword,
                     newPassword: formValue.newPassword
                  }
               }
            });
            if(!result.data.updateUser) {
               toast.error("Contraseña incorrecta")
            }else{
               toast.success("Contraseña actualizada correctamente")
               logout();
            }
         } catch (error) {
            toast.error("Error al cambiar la contraseña")
         }

      }

   });


   return (
      <Form className="password-form" onSubmit={formik.handleSubmit}>
         <Form.Input 
            placeholder="Contraseña actual"
            name="currentPassword"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={formik.errors.currentPassword && true}
         />
         <Form.Input 
            placeholder="Nueva Contraseña"
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.errors.newPassword && true}
         />
         <Form.Input 
            placeholder="Repetir nueva contraseña"
            name="repeatNewPassword"
            type="password"
            value={formik.values.repeatNewPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatNewPassword && true}
         />
         <Button className="btn-submit" type="submit">Actualizar</Button>
      </Form>
   )
}


function initialValues() {
   return {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: ""
   }
} 