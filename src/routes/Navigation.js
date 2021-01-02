import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './routes';
import { map } from "lodash"
import { getToken } from '../utils/token';
export default function Navigation() {
   const token = getToken()
   useEffect(() => {
      if(!token){
         Location.reload()
      }
      return () => {
      }
   }, [])
   return (
      <Router>
         <Switch>
            {map(routes, (route, index)=> (
               <Route 
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => (
                     <route.layout>
                        <route.component {...props}/>
                     </route.layout>
                  )}
               />
            ))}
         </Switch>
      </Router>
   )
}
