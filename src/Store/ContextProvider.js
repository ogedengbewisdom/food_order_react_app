import { useReducer } from "react"
import CartContext from "./auth-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItem = {...action.item}
            updatedItems = state.items.concat(updatedItem)
        }
        
        return {
            items: updatedItems,
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