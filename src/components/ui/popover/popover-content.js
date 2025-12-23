'use client'
import React, { useEffect, useRef, useState} from 'react';
import Popover from "@mui/material/Popover";
import {HvPopoverContext} from "./popover-context";


const HvPopoverContent = (props) => {

    const { anchorEl, setAnchorEl } = React.use(HvPopoverContext);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    useEffect(() =>{


        if(typeof props.close!=="undefined"){
            if(anchorEl!=null){
                setAnchorEl(null);
            }
        }
    },[props.close]);
    return (
        <React.Fragment>
            <Popover

                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

            >
                {props.children}
            </Popover>

        </React.Fragment>
    );
};

export default HvPopoverContent;




