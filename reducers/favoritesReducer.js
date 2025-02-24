const initState = {
    favoritesList: []
}

const favoritesReducer = (state = initState, action) => {
 
    if (action.type === 'setFavorites') {
        return {favoritesList: action.payload}
    } else if(action.type === "clearFavorites") {
        return {favoritesList: []}
    } else {
        return state
    }
}



export default favoritesReducer