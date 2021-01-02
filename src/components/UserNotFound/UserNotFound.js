import React from 'react'
import "./UserNotFound.scss"
import { Link } from 'react-router-dom'
export default function UserNotFound() {
   return (
      <div className="user-not-found">
         <p>Usuario no encontrado</p>
         <p>Es posible que el enlace que has seguido es incorrecto o que el usuario haya sido eliminado</p>
         <Link to="/">Volver al inicio</Link>
      </div>
   )
}
