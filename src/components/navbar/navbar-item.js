"use client"
import React, {Component} from 'react';


import {isMobile} from 'react-device-detect';
import Button from "@mui/material/Button";
import Link from 'next/link'


export const NavbarItem = (props) =>{

    if ((isMobile && props.menuItem[props.menuKey][0].mobile) || (!isMobile)) {
        return (

            <li  className={" md:p-0  text-[var(--hv-palette-grey-lighter)] " }>
                <Button color="menu" className="flex flex-col" component={Link} href={"/" + props.menuItem[props.menuKey][0].href}>
                                    <span className="inline-flex mb-[6px] ">
                                             <span className={"nav-item-icon "+props.menuItem[props.menuKey][0].icon}></span>
                                    </span>
                    <span className="inline-flex hv-nav-item-title">{props.menuItem[props.menuKey][0].name}</span>

                </Button>

            </li>

        )
    } else {
        return ("");
    }
}


