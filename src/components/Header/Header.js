import React from 'react'
import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Logo from "../../assets/png/Instagram_logo.svg"
import RightHeader from './RightHeader/';
import Search from "./Search"

import "./Header.scss"


export default function Header() {
   return (
      <div className="header">
         <Container>
            <Grid>
               <Grid.Column tablet={3} computer={3} mobile={5} className="header__logo">
                  <Link to="/">
                     <Image src={Logo} className="logo" alt="Instagram Logo"/>
                  </Link>
               </Grid.Column>
               <Grid.Column tablet={10} computer={10} mobile={7}>
                  <Search />
               </Grid.Column>
               <Grid.Column tablet={3} computer={3} mobile={4}>
                  <RightHeader />
               </Grid.Column>
            </Grid>
         </Container>
      </div>
   )
}
