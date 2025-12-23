"use client"
import * as React from 'react';
import {ActionDialogContext} from "./context/Context"
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {Slide} from "@mui/material";



export const  ActionDialog=()=> {
    const {action, setAction} = React.use(ActionDialogContext);

    action.saveLoading=typeof action.saveLoading === "undefined" ? false : action.saveLoading;

    return (
        <React.Fragment>
            {action.open &&
            <Slide direction="up" in={action.open} mountOnEnter unmountOnExit>
                <Paper elevation={0}   className=" bg-white w-full  fixed bottom-0 !rounded-none h-[100px] ">
                    <div className="flex justify-center items-center h-full w-full ">
                        <div className="flex flex-row justify-between min-w-[220px]">
                            <Button
                                variant="outlined"
                                onClick={action.cancel}
                                disabled={action.saveLoading}
                                color="grey">
                                Cancel
                            </Button>
                            <Button
                                loading={action.saveLoading}
                                loadingIndicator="Saving..."
                                variant="contained"
                                onClick={action.save}
                                color="grey">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Slide>
            }
        </React.Fragment>
    );
}
