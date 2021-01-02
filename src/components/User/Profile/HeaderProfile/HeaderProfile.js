import React from "react";
import "./HeaderProfile.scss";
import {Button} from "semantic-ui-react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from "../../../../gql/follow";
export default function HeaderProfile(props) {
	const {getUser, handlerModal} = props;
	const {auth} = useAuth();
	const {data, loading} = useQuery(IS_FOLLOW, {
		variables: {
			username: getUser.username
		}
	});
	const [follow] = useMutation(FOLLOW,{
		update(cache){
			
			cache.writeQuery({
				query: IS_FOLLOW,
				variables:{username: getUser.username},
				data: {
					isFollow: true
				}
			})
		}
	})
	const [unfollow] = useMutation(UNFOLLOW,{
		update(cache){
			cache.writeQuery({
				query: IS_FOLLOW,
				variables: {username: getUser.username},
				data: {
					isFollow: false
				}
			})
		}
	})
	


	const buttonFollow = () => {
		if(data.isFollow){
			return <Button className="btn-danger" onClick={onUnFollow}>Dejar de seguir</Button>
		}else{
			return <Button className="btn-action" onClick={onFollow}>Seguir</Button>
		}

	}
	const onFollow = async () => {
		try {
			await follow({
				variables: {
					username: getUser.username
				}
			})
		} catch (error) {
			console.log(error);
		}
	}
	const onUnFollow = async () => {
		try {
			await unfollow({
				variables: {
					username: getUser.username
				}
			})
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="header-profile">
			<h2>{getUser.username}</h2>
			{auth.username === getUser.username ? (
				<Button onClick={() => handlerModal("settings")}>Ajustes</Button>
			) : (
				!loading && buttonFollow()
			)}
		</div>
	);
}
