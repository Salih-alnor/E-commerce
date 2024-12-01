const initState = {
    cartItems: {
        items: [],
        totalPrice: 0,
       
    }
}

const cartReducer = (state = initState, action) => {

    if (action.type === 'getCartItems') {
        return {cartItems: {
            items: action.payload.items,
            totalPrice: action.payload.totalPrice,
           
        } }
    } else if(action.type === "clearCartItems") {
        return {cartItems: {
            items: [],
            totalPrice: 0,
           
        }}
    } else {
        return state
    }
}



export default cartReducer