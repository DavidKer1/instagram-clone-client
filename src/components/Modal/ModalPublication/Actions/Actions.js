import React from "react";
import "./Actions.scss";
import {useMutation, useQuery} from "@apollo/client";
import {
	ADD_LIKE,
	IS_LIKE,
	DELETE_LIKE,
	COUNT_LIKES,
} from "../../../../gql/like";
import {Icon} from "semantic-ui-react";
import {useEffect} from "react";
export default function Actions({publication}) {
   const [addLike] = useMutation(ADD_LIKE,{
      update(cache){
         const {countLikes} = cache.readQuery({
            query: COUNT_LIKES,
            variables: {idPublication: publication.id}
         })
         cache.writeQuery({
            query: IS_LIKE,
            variables: {
               idPublication: publication.id
            },
            data: {
               isLike: true
            }
         });
         cache.writeQuery({
            query: COUNT_LIKES,
            variables: {idPublication: publication.id},
            data: {
               countLikes: countLikes + 1
            }
         })
      }

   }
   );
   const [deleteLike] = useMutation(DELETE_LIKE, {
      update(cache){
         const {countLikes} = cache.readQuery({
            query: COUNT_LIKES,
            variables: {idPublication: publication.id}
         })
         cache.writeQuery({
            query: IS_LIKE,
            variables: {
               idPublication: publication.id
            },
            data: {
               isLike: false
            }
         })
         cache.writeQuery({
            query: COUNT_LIKES,
            variables: {idPublication: publication.id},
            data: {
               countLikes: countLikes -1
            }
         })
      }
   });
   
	const {data, loading} = useQuery(IS_LIKE, {
		variables: {
			idPublication: publication.id,
		},
	});
	const {
		data: dataCount,
		loading: loadingCount,
		startPolling,
		stopPolling,
	} = useQuery(COUNT_LIKES, {
		variables: {
			idPublication: publication.id,
		},
	});
	useEffect(() => {
		startPolling(1000);
		return () => {
			stopPolling();
		};
	}, [startPolling, stopPolling]);

	const onAddLike = async () => {
		try {
			await addLike({
				variables: {
					idPublication: publication.id,
				},
			});
         
		} catch (error) {
			console.log(error);
      }
      
	};
	
	const onDeleteLike = async () => {

		try {
			await deleteLike({
				variables: {
					idPublication: publication.id,
				},
			});
		} catch (error) {

			console.log(error);
      }
      
	};
	if (loading || loadingCount) return null;
	const {isLike} = data;

	const {countLikes} = dataCount;
	return (
		<div className="actions">
			<Icon
				className={isLike ? "like active" : "like"}
				name={isLike ? "heart" : "heart outline"}
				onClick={ isLike ? onDeleteLike : onAddLike}
			/>
			{countLikes} {countLikes === 1 ? "Like" : "Likes"}
		</div>
	);
}
