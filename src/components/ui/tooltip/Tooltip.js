import {styled} from "@mui/material/styles";
import {tooltipClasses} from "@mui/material";
import React from "react";
import {Tooltip as MuiTooltip} from "@mui/material";

const BootstrapTooltip = styled(({className, ...props}) => (
    <MuiTooltip {...props} arrow classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));
export const Tooltip=(props)=>{


    return(
        <BootstrapTooltip title={(props.title ? props.title : "")} placement={(props.placement ? props.placement : "top")}>
            {props.children}
        </BootstrapTooltip>
    );
}
