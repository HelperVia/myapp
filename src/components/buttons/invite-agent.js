
import React from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export const  InviteAgent=(props)=>{

    return(
        <React.Fragment>
            <Button
                color="grey"
                onClick={props.onClick} disabled={props.disabled}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<AddIcon />}

            >
                Invite Agent
            </Button>
        </React.Fragment>

    )
}
