import React, {useState} from "react";
import "./Profile.scss";
import {Grid, Image} from "semantic-ui-react";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../../../gql/user";
import ImageNoFound from "../../../assets/png/avatar.png";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import useAuth from "../../../hooks/useAuth";
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import SettingsForm from "../SettingsForm/SettingsForm";
import Followers from "./Followers"
export default function Profile({username, totalPublications}) {
	const {loading, data, error, refetch} = useQuery(GET_USER, {
		variables: {
			username,
		},
	});
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState("");
	const [childrenModal, setChildrenModal] = useState(null);
	const {auth} = useAuth();

	if (loading) return null;
	if (error) return <UserNotFound />;
	const {getUser} = data;
	const handlerModal = (type) => {
		switch (type) {
			case "avatar":
				setTitleModal("Cambiar foto de perfil");
				setChildrenModal(
					<AvatarForm setShowModal={setShowModal} avatar={getUser.avatar} />
				);
				setShowModal(true);
				break;
			case "settings":
				setTitleModal("");
				setChildrenModal(
					<SettingsForm setShowModal={setShowModal} setTitleModal={setTitleModal} setChildrenModal={setChildrenModal} getUser={getUser} refetch={refetch}/>
				);
				setShowModal(true);
				break;
			default:
				break;
		}
	};
	return (
		<>
			<Grid className="profile">
				<Grid.Column  mobile={16} tablet={6} computer={6} className="profile__left">
					<Image
						src={getUser.avatar ? getUser.avatar : ImageNoFound}
						avatar
						onClick={() => username === auth.username && handlerModal("avatar")}
					/>
				</Grid.Column>
				<Grid.Column  mobile={16} tablet={10} computer={10} className="profile__right">
					<HeaderProfile getUser={getUser} handlerModal={handlerModal} />
					<Followers username={username} totalPublications={totalPublications}/>
					<div className="other">
						<p className="name">{getUser.name} </p>
						{getUser.siteWeb && (
							<a
								href={getUser.siteWeb}
								rel="noopener noreferrer"
								target="_blank"
								className="siteWeb"
							>
								{getUser.siteWeb}
							</a>
						)}
						{getUser.description && (
							<p className="description">{getUser.description}</p>
						)}
					</div>
				</Grid.Column>
			</Grid>
			<ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
				{childrenModal}
			</ModalBasic>
		</>
	);
}
