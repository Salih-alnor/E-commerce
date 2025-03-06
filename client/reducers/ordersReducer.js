const initState = {
    orders: []
}

const orderReducer = (state = initState, action) => {
    if (action.type === 'setOrders') {
        return { orders: action.payload }
    } else {
        return state
    }
}

export default orderReducer;