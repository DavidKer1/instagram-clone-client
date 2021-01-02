import React from 'react'
import { Form, Button , TextArea} from "semantic-ui-react";
import "./DescriptionForm.scss"
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';

export default function DescriptionForm(props) {
   const {setShowModal,currentDescription,refetch} = props;
   const [updateUser] = useMutation(UPDATE_USER)
   const formik = useFormik({
      initialValues: {
         description: currentDescription || ""
      },
      validationSchema: Yup.object({
         description: Yup.string().required()
      }),
      onSubmit: async (formData) => {
        try {
            await updateUser({
               variables: {
                  input: formData
               }
            })
            refetch();
            toast.success("Descripción actualizada correctamente");
            setShowModal(false)
        } catch (error) {
           toast.error("Error al actualizar la biografia")
        }
      }
   });
   return (
      <Form className="description-form" onSubmit={formik.handleSubmit}>
         <TextArea
            name="description"
            placeholder="Descripcion"
            value={formik.values.description}
            onChange={formik.handleChange}
            className={formik.errors.description &&  "error"}
         />
         <Button type="submit" className="btn-submit">Actualizar</Button>
      </Form>
   )
}
