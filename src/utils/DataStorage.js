
const localDB = window.localStorage


export const getFromStorage = (key, defaultValue) => JSON.parse(localDB.getItem(key)) || defaultValue

export const setStateAndStore = (key, value, setStateFunction) => {
	localDB.setItem(key, JSON.stringify(value))
	setStateFunction(value)
}