"use client"
import React, { useState} from "react";

import {ActionDialogContext} from "./context/Context"


export const ActionDialogProvider=(props)=>{

    const [action, setAction] = useState({
        open:false
    });


    return(
        <React.Fragment>
            <ActionDialogContext.Provider value={{ action,setAction  }}>
                {props.children}
            </ActionDialogContext.Provider>
        </React.Fragment>

    )
}
