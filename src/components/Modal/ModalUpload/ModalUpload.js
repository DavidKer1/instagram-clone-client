import React, { useCallback, useState } from 'react'
import {useDropzone} from "react-dropzone"
import "./ModalUpload.scss"
import {Modal, Icon, Button, Dimmer, Loader} from "semantic-ui-react"
import { PUBLISH } from '../../../gql/publication'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
export default function ModalUpload(props) {

   const [publish] = useMutation(PUBLISH);
   const [isLoading, setIsLoading] = useState(false)
   const {show, setShow} = props;
   const [fileUpload, setFileUpload] = useState(null)
   const onDrop = useCallback(
      (acceptedFile) => {
         if(acceptedFile.length > 0){
            
            const file = acceptedFile[0]
            setFileUpload({
               type: "image",
               file,
               preview: URL.createObjectURL(file)
            })
         } else {
            setFileUpload(null)
         }
      }
   )
   const {getRootProps, getInputProps, isDragReject, isDragActive, isDragAccept} = useDropzone({
      accept:"image/jpeg, image/png",
      noKeyboard:true,
      multiple: false,
      onDrop
   })
   const onClose=()=> {
      setIsLoading(false);
      setFileUpload(null)
      setShow(false);
   }
   const onPublish =async () => {
      try {
         setIsLoading(true)

         const {data} = await publish({
            variables: {
               file: fileUpload.file
            }
         })

         if(!data.publish.status){
            toast.warning("Error en la publicacion")
            isLoading(false)
         }else{
            onClose()

         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <Modal size="small" open={show} onClose={onClose} className="modal-upload">
         <div {...getRootProps()} className="dropzone" style={fileUpload && {border: 0}}>
            {!fileUpload && (
               <>
                  <Icon name="cloud upload" />
                  {
                     !isDragActive &&
                     <p>Arrastra tu foto o video que quieras publicar</p>
                  }
                  {
                     isDragAccept && 
                     <p>Suelte imagen aquí</p>
                  }
                  {
                     isDragReject &&
                     <p>Formato de imagen no valido</p>
                  }
               </>
            )}
            <input {...getInputProps()} />   
            
         </div>
         {fileUpload?.type === "image" && (
            <div className="image" style={{backgroundImage: `url("${fileUpload.preview}")`}}/>
         )}
         {
            fileUpload && (
               <Button className="btn-upload btn-action" onClick={onPublish}>
                  Publicar
               </Button>
            )
         }

         {
            isLoading && (
               <Dimmer className="publishing" active>
                  <Loader />
                  <p>Publicando...</p>
               </Dimmer>
            )
         }
      </Modal>
   )
}
