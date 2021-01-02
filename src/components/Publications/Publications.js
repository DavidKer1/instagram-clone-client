import React from 'react'
import { Grid } from "semantic-ui-react";
import "./Publications.scss"
import { map } from 'lodash';
import PreviewPublication from './PreviewPublication';
export default function Publications({getPublications}) {
   return (
      <div className="publications">
         <h1>Publicaciones</h1>
         <Grid columns={3} className="" >
            {
               map(getPublications, (publication, index)=> (
                  <Grid.Column key={index}>
                     
                     {
                        <PreviewPublication publication={publication} />
                     }
                  </Grid.Column>
               ))
            }
         </Grid>
      </div>
      
   )
}
