import { getRandomColor } from "./GeneralUtils";

export const withoutFriend = ({ friends, friendToRemove }) => friends.filter(friend => friend.id !== friendToRemove.id)


export const addFriendFromURL = ({ user, friends, setFriends }) => {
	const urlGetParams = new URLSearchParams(window.location.search);
	//return unless has new Friend id
	const newFriendId = urlGetParams.get('id')
	if (!newFriendId || newFriendId === user?.id || friends.filter(friend => friend.id === newFriendId).length > 0) {
		return;
	}

	const generatedRandomColor = getRandomColor()
	
	const newFriend = {
		id: urlGetParams.get('id'),
		name: urlGetParams.get('name'),
		color: generatedRandomColor,
		location: {
			lat: Number.parseFloat(urlGetParams.get('lat')),
			lng: Number.parseFloat(urlGetParams.get('lng')),
		}
	}
	console.log('newFriend', newFriend)
	setFriends([...friends, newFriend])
}