import React, { useState } from "react";
import "./PreviewPublication.scss";
import {Image} from "semantic-ui-react";
import ModalPublication from "../../Modal/ModalPublication";
export default function PreviewPublication({publication}) {
   const [showModal, setShowModal] = useState(false)

	return (
		<>
			<div className="preview-publication" style={{backgroundImage: `url("${publication.file}")` }} onClick={() => setShowModal(true)}>
				{/* <Image className="preview-publication__image" src={publication.file} onClick={() => setShowModal(true)}/> */}
			</div>
            <ModalPublication show={showModal} setShow={setShowModal} publication={publication} /> 
		</>
	);
}
