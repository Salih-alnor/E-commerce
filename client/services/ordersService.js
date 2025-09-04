import api from "../api";

const getOrders = async () => {
  try {
    const response = await api.get("/order");
    return {data} = response;
  } catch (error) {
    throw error;
  }
};

const createCashOrder = async (cartId) => {
    try {
      const response = await api.post(`/order/cash/${cartId}`);
      return {data} = response;
    } catch (error) {
      throw error;
    }
  
};

const createCardOrder = async (cartId) => {
    try {
      const response = await api.post(`order/checkout/${cartId}`);
      return {data} = response;
    } catch (error) {
      throw error;
    }
}

const createPayPalOrder = async (cartItems) => {
  const cartId = cartItems.cartId;
    try {
      const response = await api.post(`/order/paypal/${cartId}`);
      return {data} = response;
    } catch (error) {
      throw error;
    }
}


export { getOrders, createCashOrder, createCardOrder, createPayPalOrder };
