import { useMapEvents } from 'react-leaflet';
import shortid from 'shortid'
import {useState, useEffect} from 'react'

export const GoToUser = ({ setUser, user, setMapObj }) => {
	const [hasCentered, setHasCentered] = useState(false)
	const map = useMapEvents({
		click: () => {
				map.locate()
		},
		locationfound: async (e) => {
			if (!hasCentered) {
				map.panTo(e.latlng, map.getZoom())
				setHasCentered(true)
			}
			
			if (user?.location) {
				// User already set
				return;
			}
			const userLat = Number.parseFloat(e.latlng.lat).toFixed(3)
			const userLng = Number.parseFloat(e.latlng.lng).toFixed(3)

			setUser({
				id: shortid.generate(),
				location: {
					lat: userLat,
					lng: userLng
				}
			})
		},
	})


	useEffect(() => {
	  map.locate()
	  setMapObj(map)
	}, [map])

	return null
}