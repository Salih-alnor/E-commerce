const initState = {
  productsList: [],
};

const productsReducer = (state = initState, action) => {
  if (action.type === "getProducts") {
    return { productsList: action.payload };
  } else {
    return state;
  }
};


export default productsReducer;
