import { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import PersonLocation from './components/PersonLocation'
import UserShareComponent from './components/UserShareComponent'
import FriendsListComponent from './components/FriendsListComponent'
import MeetUpRadiusComponent from './components/MeetUpRadiusComponent'
import AdditionalNotesTextComponent from './components/AdditionalNotesTextComponent'
import { withoutFriend, addFriendFromURL } from './utils/Friends'
import { GoToUser } from './utils/MapUtils'
import { getFromStorage, setStateAndStore } from './utils/DataStorage'
import { defaultMapCenter } from './config'

const isMobile = window.innerWidth <= 900

function App() {
  const [allowedDistanceRadius, setAllowedDistanceRadiusState] = useState(getFromStorage('allowedDistanceRadius', 5000)) //radius of circle in metres
  const [user, setUserState] = useState(getFromStorage('user', null))
  const [friends, setFriendsState] = useState(getFromStorage('friends', []))
  const [mapObj, setMapObj] = useState(null)

  const setAllowedDistanceRadius = (value) => setStateAndStore('allowedDistanceRadius', value, setAllowedDistanceRadiusState)
  const setUser = (value) => setStateAndStore('user', value, setUserState)
  const setFriends = (value) => setStateAndStore('friends', value, setFriendsState)

  useEffect(() => {
    addFriendFromURL({ user: user, friends: friends, setFriends: setFriends})
  }, [user, friends])

  console.log("user", user)
  console.log("friends", friends)

  const userLoaded = user !== null

  const removeFriend = friendToRemove => setFriends(withoutFriend({ friends: friends, friendToRemove: friendToRemove }))

  return (
    <div className="App h-screen w-full bg-gray-100 grid grid-cols-5">
      <div className="  col-span-5 md:col-span-1 p-2 pb-8">
        {(!userLoaded) ? 
        <p className="font-semibold bg-white p-2 border-4 rounded border-red-500">
          Access to your browser's location information is required. This data is not stored on servers, it is stored in your local browser. 
          Click the location pin in your URL bar above to enable location information and refresh the webpage.
        </p>
         : null}

        <h1 className="mt-4 mb-4 bold text-center w-full">
          COVID Meetup Radius
        </h1>
        <p className="mb-8 italic text-center w-full text-sm">
          Find which friends are within your {allowedDistanceRadius/1000}Km radius and where you can go for outdoor exercise
        </p>

        {userLoaded ?
          <UserShareComponent allowedDistanceRadius={allowedDistanceRadius} setUser={setUser} user={user} />
          : null}
        <FriendsListComponent removeFriend={removeFriend} friends={friends} />
        <MeetUpRadiusComponent allowedDistanceRadius={allowedDistanceRadius} setAllowedDistanceRadius={setAllowedDistanceRadius} />

        <AdditionalNotesTextComponent />
      </div>
      <div id="mapDivContainer" className="col-span-5 md:col-span-4">
        <MapContainer className="h-full w-full" center={defaultMapCenter} zoom={isMobile ? 12 : 13}>

          <GoToUser setMapObj={(v) => setMapObj(v)} user={user} setUser={(v) => setUser(v)} />

          {userLoaded ?
            <PersonLocation allowedDistanceRadius={allowedDistanceRadius} color={'orange'} user={true} location={user.location} name="Your location" />
            : null}

          {friends.map(friend => <PersonLocation key={friend.id}
            color={friend.color}
            allowedDistanceRadius={allowedDistanceRadius} user={false} location={friend.location} name={friend.name} />)}

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;