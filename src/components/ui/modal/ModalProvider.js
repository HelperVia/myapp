"use client"
import React, {useCallback, useEffect, useRef, useState} from "react";

import {ModalContext} from "./context/Context"


export const ModalProvider=(props)=>{

    const [modal, setModal] = useState({
        open:false
    });

    const useHasChanged= (val) => {
        const prevVal = usePrevious(val)
        return prevVal
    }
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const hasVal1Changed = useHasChanged(modal)

    useEffect(() => {
        if(hasVal1Changed!==undefined){
            if(hasVal1Changed.prev!==undefined){
                delete hasVal1Changed.prev;
            }
        }
        modal.prev = hasVal1Changed;
    });
    return(
        <React.Fragment>
            <ModalContext.Provider value={{ modal,setModal  }}>
                {props.children}
            </ModalContext.Provider>
        </React.Fragment>

    )
}
