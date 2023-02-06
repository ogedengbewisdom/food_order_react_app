import React from "react";


const CartContext = React.createContext({
    item: [],
    totalAmount: 0,
    removeItem: (id) => {},
    addItem: (item) => {}
})

export default CartContext