import React, {useState} from "react"
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";
export const InputNumber= (props)=>{


    const onChangeInput = (new_value) =>{
        if(typeof props.max!=="undefined"){
            let max = parseInt(props.max);
            if(new_value>max){
                new_value=props.value;
            }
        }
        if(typeof props.min!=="undefined"){
            let min = parseInt(props.min);
            if(new_value<min){
                new_value=1;
            }
        }
        props.onChange(new_value);
    }
    const increase = () =>{
        let new_value=parseInt(props.value)+1;
        if(typeof props.max!=="undefined"){
            let max = parseInt(props.max);
            if(new_value>max){
                new_value--;
            }
        }
        props.onChange(new_value);
    }
    const decrease = () =>{

        let new_value=parseInt(props.value)-1;
        if(typeof props.min!=="undefined"){
            let min = parseInt(props.min);
            if(new_value<min){
                new_value++;
            }
        }

        props.onChange(new_value);
    }

    return(

        <div className=" bg-white border border-gray-200 rounded-lg">
            <div className="w-full flex justify-between items-center gap-6 h-full">
                <div className="flex justify-end items-center gap-[1px] w-full h-full">
                    <TextField
                        value={props.value}
                        type="number"
                        onChange={(e) => {
                            onChangeInput(e.target.value);
                        }}
                        variant="standard"
                        sx={{
                            "&.MuiFormControl-root":{
                                "width":"100%"
                            }
                        }}
                        slotProps={{
                            htmlInput: {
                                className:"!pr-[10px] text-center w-full  bg-transparent  text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none  ",
                                min:1,
                                max:50
                            },
                            input:{
                                disableUnderline: true,

                            }
                        }}

                    />
                    <div className="flex gap-[10px] p-[7px] border-l-[1px]">
                        <button type="button"
                                onClick={decrease}
                                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none  ">
                            <RemoveOutlinedIcon className="!size-3.5"/>
                        </button>
                        <button type="button"
                                onClick={increase}
                                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none  ">
                            <AddIcon className="!size-3.5"/>
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}
