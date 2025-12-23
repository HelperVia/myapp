import React, {useState} from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {TextField} from "@mui/material";


export const SelectBox=(props)=>{


    return(
        <TextField
            fullWidth={(props.fullWidth) ? props.fullWidth : true}
            select
            size={(props.size) ? props.size : "small"}
            onChange={(e)=>props.onChange(e.target.value)}
            value={props.selected}
            SelectProps={{
                IconComponent: KeyboardArrowDownIcon,
                renderValue:(selected) => (
                    props.data.find((item) => item.value === selected).label
                )}
            }
            InputProps={
                {
                    sx:{
                        "&.MuiInputBase-root":{
                            lineHeight:"inherit"
                        }}
                }
            }

        >
            {props.data.map((option) => (
                <MenuItem key={option.value} value={option.value} name={option.label} sx={{"margin":"3px 10px","&.Mui-selected,&.Mui-selected:hover,&.MuiMenuItem-root:hover": {
                        borderRadius: "10px"
                    }}}

                >
                    <menu-item-container className="flex flex-row justify-between w-full items-center">
                        <menu-item-label>
                            {option.label}
                        </menu-item-label>
                        <menu-item-icon>
                            {props.selected == option.value &&
                            <CheckOutlinedIcon/>
                            }
                        </menu-item-icon>
                    </menu-item-container>
                </MenuItem>
            ))}
        </TextField>
    );
}
