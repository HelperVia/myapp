
import React from "react";
import {DepartmentNameCard} from "@components/teams/department-name-card";



export const DepartmentNameRender=(props)=>{


    return(
        <React.Fragment>
            <DepartmentNameCard department={{
                "department_name":props.data.department,
                "first_letter":props.data.first_letter
            }}/>

        </React.Fragment>

    )
}
