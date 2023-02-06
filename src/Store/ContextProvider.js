import CartContext from "./auth-context"


const ContextProvider = (props) => {

    const removeItemHandler = (id) => {}

    const addItemHandler = (item) => {}

    const contextValue = {
        items: [],
        totalAmount: 0,
        removeItem: removeItemHandler,
        addItem: addItemHandler
    } 

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export default ContextProvider