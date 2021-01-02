import React from 'react';
import "./ModalPublication.scss";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from './CommentForm';
import Comments from './Comments/';
import Actions from './Actions/';
export default function ModalPublication(props) {
   const {show, setShow, publication} = props;
   const onClose= () => setShow(false);
   
   return (
      <Modal open={show} onClose={onClose} className="modal-publication">
         <Grid >
            <Grid.Column  className="modal-publication__left" mobile={9} computer={11} tablet={11} style={{backgroundImage: `url("${publication.file}")`}} />
            <Grid.Column  className="modal-publication__right"  mobile={7} computer={5} tablet={5}>
               <Comments publication={publication}/>
               <Actions publication={publication}/>
               <CommentForm publication={publication}/>
            </Grid.Column>
         </Grid>
      </Modal>
   )
}
