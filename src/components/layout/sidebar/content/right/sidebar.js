import React, {useEffect} from 'react';
import {RightSidebarContext} from "../../../content/context/RightSidebarContext";
import {Box} from "../../../Box";
import { useRouter } from 'next/navigation'


export const RightSidebar=(props)=>{
    const { sidebar, setSidebar } = React.use(RightSidebarContext);
    const navigate = useRouter();
    useEffect(() => {
        setSidebar({});
    },[navigate]);
    return (
        <React.Fragment>
            {sidebar.component &&
            <div className={((sidebar.className) ? sidebar.className : " !min-w-[320px]")+" right-sidebar"}>
                <Box header={(sidebar.header) ? sidebar.header : ""}>
                    <div className="right-sidebar-wrap active">
                        {sidebar.component}
                    </div>
                </Box>
            </div>
            }
        </React.Fragment>
    )

}
