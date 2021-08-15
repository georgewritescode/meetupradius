
export default ({ allowedDistanceRadius, setAllowedDistanceRadius }) => {

	return <div className="w-full text-left">
		<label className="mt-8 block text-gray-700 text-sm font-bold mb-2">
			Radius allowed to travel
		</label>
		<div className="w-full">

			<input className="shadow appearance-none border rounded w-24 mr-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
				id="shareURL" type="number" 
				onChange={(e) => { return setAllowedDistanceRadius(Number.parseInt(e.target.value)*1000)}}
				value={allowedDistanceRadius/1000}
			/>
			<span>Km</span>
		</div>
	</div>
}