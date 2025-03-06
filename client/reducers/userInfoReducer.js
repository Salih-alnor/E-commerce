const initState = {
    userInfo: [],
}

const userReducer = (state = initState, action) => {
    if (action.type === 'setUserInfo') {
        return {userInfo: action.payload }
    } else {
        return state
    }
}

export default userReducer;