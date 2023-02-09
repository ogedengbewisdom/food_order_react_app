import { useReducer } from "react"
import CartContext from "./auth-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedItem = state.items.concat(action.item)
        const updatedTotalAmount = state.totalAmount + action.item[0].price * action.item[0].amount
        return {
            items: updatedItem,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState
}

const ContextProvider = (props) => {

    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState)

    const removeItemHandler = (id) => {}

    const addItemHandler = (item) => {
        dispatchCartState({type: "ADD", item: item})
    }

    const contextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
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