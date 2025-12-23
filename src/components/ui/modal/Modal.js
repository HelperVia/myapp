"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ModalContext} from "./context/Context"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export const  Modal=()=> {
    const {modal, setModal} = React.use(ModalContext);

    if(typeof modal.close==="undefined"){
        modal.close=true;
    }

    const handleClose = () => {

        modal.open=false;
        setModal({modal});
    };


    const smallScreen=useMediaQuery('(max-width:600px)');

    return (
        <React.Fragment>
            {modal.open &&
            <BootstrapDialog
                fullScreen={(typeof modal.fullScreen!=="undefined") ? modal.fullScreen : smallScreen}
                fullWidth={(typeof modal.fullWidth!=="undefined") ? modal.fullWidth : true}
                maxWidth={modal.size ? modal.size : "md"}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={modal.open}
                sx={{
                    ".MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)"
                    },
                    ".MuiDialogContent-root": {
                        "padding":"33px"
                    },




                }}
            >
                {modal.title &&
                <DialogTitle sx={{m: 0, p: 2}} >
                    <span className="font-bold">{modal.title}</span>
                </DialogTitle>
                }
                {modal.close &&
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >

                    <CloseIcon/>
                </IconButton>
                }
                <DialogContent>
                    {modal.content &&
                    modal.content
                    }
                </DialogContent>
                {modal.footer &&
                <DialogActions>

                </DialogActions>
                }
            </BootstrapDialog>
            }
        </React.Fragment>
    );
}
