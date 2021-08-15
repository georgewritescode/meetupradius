const FriendListItem = ({ friend, removeFriend }) => {

	return <li>
		<span className="text-xl" style={{ "color": friend.color }}>●&nbsp;</span>{friend.name}
		<span onClick={() => removeFriend(friend)}
			className="text-right text-lg cursor-pointer" title="Remove friend" > × </span>
	</li>
}
export default ({ friends, removeFriend }) => {
	if (friends.length === 0) {
		return <p className="mt-8">Share the URL above to add your friends to the map. You will be able to see who is within your radius for 1 on 1 outdoor exercise</p>
	}
	return (<div className="text-left">
		<label className="mt-8 block text-gray-700 font-bold mb-2 text-sm">
			Friends
		</label>
		<div className="w-full">
			<ul>
				{friends.map(friend => <FriendListItem key={friend.id} removeFriend={removeFriend} friend={friend} />)}

			</ul>
		</div>
	</div>)
}