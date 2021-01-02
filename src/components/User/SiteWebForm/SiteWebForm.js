import React from 'react'
import {Form, Button} from "semantic-ui-react"
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import "./SiteWebForm.scss"
export default function SiteWebForm(props) {
   const {setShowModal, currentSiteWeb, refetch} = props;
   const [updateUser] = useMutation(UPDATE_USER)
   const formik = useFormik({
      initialValues: {
         siteWeb: currentSiteWeb || ""
      },
      validationSchema: Yup.object({
         siteWeb: Yup.string().required().url()
      }),
      onSubmit: async (formData) => {
         try {
            await updateUser({
               variables: {
                  input: formData
               }
            });
            toast.success("El sitio web se actualizo correctamente");
            refetch();
            setShowModal(false);
         } catch (error) {
            toast.error("Error al actualizar el sition web")
         }
         
      }
   })
   return (
      <Form className="site-web-form" onSubmit={formik.handleSubmit}>
         <Form.Input 
            placeholder="http://www.example.com"
            name="siteWeb"
            value={formik.values.siteWeb}
            onChange={formik.handleChange}
            error={formik.errors.siteWeb && true}

         />
         <Button type="submit" className="btn-submit">Actualizar</Button>
      </Form>
   )
}
