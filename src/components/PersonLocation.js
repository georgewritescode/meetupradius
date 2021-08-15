import { Marker, Tooltip, Circle } from 'react-leaflet';


export default ({ allowedDistanceRadius, user = false, location, name, color }) => {
	console.log('adding marker', user, name, location)

	return <>

		<Circle center={[location.lat, location.lng]} pathOptions={{ color: color, stroke: true, weight: 5 }} radius={allowedDistanceRadius}>
			<Tooltip direction="bottom" opacity={1} permanent>
				{name}
			</Tooltip>
			<Marker  position={[location.lat, location.lng]}>
			</Marker>
		</Circle>
	</>
}