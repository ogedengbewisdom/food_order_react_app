import React from "react";


const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    removeItem: (id) => {},
    addItem: (item) => {},
    resetItem: () => {}
})

export default CartContext