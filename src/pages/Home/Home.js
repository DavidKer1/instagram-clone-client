import React from 'react';
import "./Home.scss";
import { Grid } from "semantic-ui-react";

import Feed from '../../components/Home/Feed';
import UserNotFolloweds from '../../components/Home/UsersNotFolloweds';

export default function Home() {
   
   
   return (
      <Grid className="home">
         <Grid.Column className="home__left" width={10} mobile={16} computer={10}>
            <Feed />
         </Grid.Column>
         <Grid.Column className="home__right" width={6}>
            <UserNotFolloweds />
         </Grid.Column>
      </Grid>
   )
}
