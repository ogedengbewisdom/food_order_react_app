import { Fragment } from "react"
import ReactDOM from "react-dom"
import classes from "./Modal.module.css"

const Modal = (props) => {

    const BackDrop = () => {
        return <div className={classes.backdrop} onClick={props.onClick}></div>
    }

    const ModalOverlay = (props) => {
        return (
            <div className={classes.modal}>
                <div className={classes.content}>{props.children}</div>
            </div>
        )
    }

    const portalElement = document.getElementById("overlay");

    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClick={props.onClick} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal;