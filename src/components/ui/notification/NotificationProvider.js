"use client"
import React, {useCallback, useEffect, useRef, useState} from "react";

import {NotifyContext} from "./context/Context"
export const NotificationProvider=(props)=>{

    const [notify, setNotify] = useState({
        open:false
    });


    return(
        <React.Fragment>
            <NotifyContext.Provider value={{ notify,setNotify  }}>
                {props.children}
            </NotifyContext.Provider>
        </React.Fragment>

    )
}
