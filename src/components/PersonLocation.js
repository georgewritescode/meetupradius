import { Marker, Tooltip, Circle } from 'react-leaflet';


export default ({ allowedDistanceRadius, user = false, location, name, color }) => {
	console.log('adding marker', user, name, location)

	return <>

		<Circle center={[location.lat, location.lng]} pathOptions={{ color: color, stroke: true, weight: 5 }} radius={allowedDistanceRadius}>
			<Circle fillOpacity={1} center={[location.lat, location.lng]} pathOptions={{ color: color, stroke: true, weight: 5 }} radius={100} />

			<Tooltip direction="bottom" opacity={1} permanent>
				{name}
			</Tooltip>

		</Circle>
	</>
}