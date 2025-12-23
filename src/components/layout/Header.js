
import React from "react";
import {ContentContext} from "./content/context/ContentContext";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Link from 'next/link'



export const Header=({header})=>{
    const { pageFocused, setPageFocused } = React.use(ContentContext);
    return(

        <div className={"chat-header "}>
            {header.title &&
            <div>
                <span className="header-name">{header.title}</span>
            </div>
            }
            {header.navigate &&
            <Link
                {...header.navigate}
                className="header-name">
                <ArrowBackIosOutlinedIcon sx={{fontSize: "12px"}}/>
                {header.navigate.title}
            </Link>
            }
            {header.close &&
            <div>
                <a href="#"
                   onClick={e =>setPageFocused('chat-middle-focused chat-right-closed')}
                   className="close_profile close_profile4">
                    <svg
                        width="20px" height="20px" fill="#1C274C"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                        data-testid="ClearIcon">
                        <path
                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </a>
            </div>
            }
            {header.component &&
            header.component
            }
        </div>

    )
}
