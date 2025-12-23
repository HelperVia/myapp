import React from 'react';


import {HvPopoverContext} from "./popover-context";

const HvPopover = ({ children, content }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <React.Fragment>
            <HvPopoverContext.Provider value={{ anchorEl, setAnchorEl }}>
                {children}
            </HvPopoverContext.Provider>
        </React.Fragment>
    );
};

export default HvPopover;




