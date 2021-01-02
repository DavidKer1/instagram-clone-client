import React from 'react'
import { useQuery } from "@apollo/client"
import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';
import { Link } from "react-router-dom";
import { map } from "lodash";
import "./UserNotFolloweds.scss"
import { Image } from "semantic-ui-react";
import ImageNoFound from "../../../assets/png/avatar.png";
export default function UserNotFolloweds() {

   const {data, loading} = useQuery(GET_NOT_FOLLOWEDS) 

   if (loading) return null
   const {getNotFolloweds} = data 
   return (
      <div className="user-not-followeds">
         <h3>Usuario que no sigues</h3>
         {map(getNotFolloweds, (user, index) => (
            <Link key={index} to={`/${user.username}`} className="user-not-followeds__user">
               <Image 
                  src={user.avatar || ImageNoFound}
                  avatar
               />
               <span>{user.name}</span>
            </Link>
         ))}
      </div>
   )
}
