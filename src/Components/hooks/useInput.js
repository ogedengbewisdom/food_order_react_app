import { useReducer } from "react"

const initialState = {
    value: "",
    isTouch: null
}
const inputFunction = ( state, action ) => {
    if ( action.type === "INPUT" ) {
        return { value: action.value, isTouch: state.isTouch }
    } else if ( action.type === 'BLUR' ) {
        return { value: state.value, isTouch: true }
    } else if ( action.type === "RESET" ) {
        return { value: "", isTouch: false}
    } else {
        return initialState
    }
}

const useInput = (checkIsvalid) => {

    const [ valueState, dispatchValue ] = useReducer( inputFunction, initialState )

    const valueIsvalid = checkIsvalid(valueState.value)
    const valueIsInvalid = !valueIsvalid && valueState.isTouch

    const valueChangeHandler = (event) => {
        dispatchValue({ type: "INPUT", value: event.target.value })
    }

    const valueBlurHandler = () => {
        dispatchValue({ type: "BLUR" })
    }

    const reset = () => {
        dispatchValue({ type: "RESET" })
    }

    return {
        value: valueState.value,
        valueIsvalid,
        valueIsInvalid,
        valueChangeHandler,
        valueBlurHandler,
        reset
    }
}

export default useInput