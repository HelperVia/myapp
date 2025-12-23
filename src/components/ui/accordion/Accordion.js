import React from 'react';

import Accordion from '@mui/material/Accordion';
export const HvAccordion = (props) => {


    return (
        <React.Fragment>
            <Accordion
                defaultExpanded={props.expanded ? props.expanded : false}
                className={props.classes}
                disableGutters={true} style={{ boxShadow: "none", ...props.style}} sx={{
                '&:before': {
                    display: 'none',
                }
            }}>
                {props.children}
            </Accordion>
        </React.Fragment>
    );
};






