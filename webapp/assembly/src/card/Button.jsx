import React from 'react'
import Classes from "../css/button.module.css"

const Button = (props) => {
    return(
        <button
           type={props.type || 'button'}
           className={`${Classes.button} ${props.className}`}
           onClick={props.onClick}
           disabled={props.disabled}
        >
            {props.children}
        </button>
   
    )
}

export default Button