
import React from "react";
import {Header} from "./Header";

export const Box=({children,className="",header={}})=>{

    return(
        <div className={className+"  open  flex flex-row w-[100%] h-[calc(100vh_-_70px)] md:h-[calc(100vh)] "}>
            <div className=" w-full flex flex-col h-full ">
                <Header  header={header}  />
                <div className="overflow-y-auto h-full">
                    {children}
                </div>
            </div>
        </div>

    )
}
