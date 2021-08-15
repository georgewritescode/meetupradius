import { useState } from 'react'
import { appURL } from '../config'
import Swal from 'sweetalert2'

export default ({ user, setUser, allowedDistanceRadius }) => {
	const [copied, setCopied] = useState(false)
	const [nameValue, setNameValue] = useState("")

	const shareURL = `${appURL}?name=${user.name}&lat=${user.location.lat}&lng=${user.location.lng}&id=${user.id}`

	if (!user.name) {
		return <div className="text-left">
			<label className="block text-gray-700 font-bold mb-2 text-center w-full">
				Enter your first name to share your {allowedDistanceRadius/1000}km radius with friends
			</label>
			<div className="w-full flex items-left">

				<input className="shadow appearance-none border rounded w-full mr-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
					id="getNameInput" type="text"
					placeholder="first name"
					onChange={(e) => setNameValue(e.target.value)}
					value={nameValue}
				/>
				
				<button disabled={nameValue===""} onClick={() => {
					setUser({ ...user, name: nameValue}, ()=> {
						navigator.clipboard.writeText(shareURL)
						Swal.fire({
							icon: 'success',
							title: 'Thanks! Share the URL copied to your clipboard with friends to see your meet-up radius',
						})
					})
			
				}} className="btn btn-primary" type="button">
					Submit
				</button>
			</div>
		</div>
	}

	return <>
		<label className="block text-gray-700 font-semibold text-sm mb-2 w-full text-center">
			Share this URL with friends to share your meetup radius
		</label>
		<div className="w-full flex items-center">

			<input className="shadow appearance-none border rounded w-full mr-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
				id="shareURL" type="text" readOnly={true}
				value={shareURL}
			/>
			<button onClick={() => {
				navigator.clipboard.writeText(shareURL)
				setCopied(true)
			}} className="btn btn-primary" type="button">
				{copied ? "Copied" : "Copy"}
			</button>
		</div>
	</>
}