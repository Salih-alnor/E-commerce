const initState = {
    cartItems: []
}

const cartReducer = (state = initState, action) => {
 
    if (action.type === 'getCartItems') {
        return {cartItems: action.payload }
    } else if(action.type === "clearCartItems") {
        return {cartItems: []}
    } else {
        return state
    }
}



export default cartReducer