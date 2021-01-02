import React, { useState } from 'react'
import { useEffect } from 'react'
import "./Feed.scss"
import {Image} from "semantic-ui-react"
import {map} from "lodash"
import {Link} from "react-router-dom"
import {useQuery} from "@apollo/client"
import ImageNotFound from "../../../assets/png/avatar.png"
import { GET_PUBLICATIONS_FOLLOWEDS } from '../../../gql/publication'
import Action from "../../Modal/ModalPublication/Actions";
import CommentForm from "../../Modal/ModalPublication/CommentForm"
import ModalPublication from "../../Modal/ModalPublication"
export default function Feed() {
   const {data, loading, startPolling, stopPolling} = useQuery(GET_PUBLICATIONS_FOLLOWEDS);
   const [showModal, setShowModal] = useState(false)
   const [publicationSelect, setPublicationSelect] = useState(null)
   useEffect(() => {
      startPolling(1000);
      return () => {
         stopPolling();
      }
   }, [startPolling, stopPolling])
   if(loading) return null;
   const {getPublicationsFolloweds} = data
   const openPublication = (publication) => {
      setPublicationSelect(publication)
      setShowModal(true)
   }

   return (
      <>
      <div className="feed">
         {map(getPublicationsFolloweds, (publication, index) =>(
            <div key={index} className="feed__box">
               <Link to={`/${publication.idUser.username}`}>
                  <div className="feed__box-user">
                     <Image 
                        src={publication.idUser.avatar || ImageNotFound}
                        avatar
                     />
                     <span>{publication.idUser.name}</span>
                  </div>
               </Link>
               <div
                  className="feed__box-photo"
                  style={{backgroundImage:`url("${publication.file}")`}}
                  onClick={() => openPublication(publication)}
               />
               <div className="feed__box-actions">
                  <Action publication={publication}/>
               </div>
               <div className="feed__box-form">
                  <CommentForm publication={publication}/>
               </div>
            </div>
         ))}
      </div>
      {showModal && (
         <ModalPublication 
            show={showModal}
            setShow={setShowModal}
            publication={publicationSelect}
         />
      )}
      </>
   )
}
