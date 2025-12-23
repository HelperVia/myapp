import React, { useEffect, useRef, useState} from 'react';
import {HvPopoverContext} from "./popover-context";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const HvPopoperTrigger = (props) => {
    const { anchorEl, setAnchorEl } = React.use(HvPopoverContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };



    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <React.Fragment>

            <div  aria-describedby={id} variant="contained" onMouseDown={handleClick}  className="flex flex-row items-center justify-center gap-[4px]">
                {props.children}
                {props.arrow &&
                <React.Fragment>
                    {open &&
                    <KeyboardArrowUpIcon />
                    }
                    {!open &&
                    <KeyboardArrowDownIcon />
                    }
                </React.Fragment>
                }
            </div>

        </React.Fragment>
    );
};

export default HvPopoperTrigger;




