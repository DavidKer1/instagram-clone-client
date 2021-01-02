import React from 'react'
import "./Comments.scss"
import { useQuery } from '@apollo/client';
import { GET_COMMENT } from '../../../../gql/comment';
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import ImageNoFound from "../../../../assets/png/avatar.png"
import { useEffect } from 'react';
export default function Comments({publication}) {
   const {data, loading, startPolling, stopPolling} = useQuery(GET_COMMENT, {
      variables: {
         idPublication: publication.id
      }
   });

   useEffect(() => {
      startPolling(1000)
      return () => {
         stopPolling()
      }
   }, [startPolling, stopPolling])
   if(loading) return null;
   const {getComments} = data
   return (
      <div className="comments">
         {
            map(getComments, (comment, index) => (
               <Link key={index} className="comment" to={`/${comment.idUser.username}`}>
                  <Image src={comment.idUser.avatar || ImageNoFound} avatar /> 
                  <div>
                     <p>{comment.idUser.username}</p>
                     <p>{comment.comment}</p>
                  </div>
               </Link>  
            ))
         }
      </div>
   )
}
