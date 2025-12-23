import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';

export const HvAccordionHeader = (props) => {


    return (
        <AccordionSummary
            className={props.classes}
            expandIcon={(props.expandIcon) ? props.expandIcon : <ExpandMoreIcon sx={{ color: "#1C274C" }}/>} >
            {props.children}
        </AccordionSummary>
    );
};






