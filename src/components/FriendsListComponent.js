const FriendListItem = ({ friend, removeFriend }) => {

	return <li>
		<span className="text-xl" style={{ "color": friend.color }}>●&nbsp;</span>{friend.name}
		<span onClick={() => removeFriend(friend)}
			className="text-right text-lg cursor-pointer" title="Remove friend" > × </span>
	</li>
}
export default ({ friends, removeFriend }) => {

	if(friends.length === 0) {
		return <div />
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