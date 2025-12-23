
import React from "react";


export const HeaderContainer=(props)=>{

    return(
        <div className={"chat-header "+props.class}>
            {props.children}
        </div>

    )
}
