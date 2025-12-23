
import React, {useMemo, useState} from "react"
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions,themeMaterial} from 'ag-grid-community';
provideGlobalGridOptions({ theme: "legacy"});
ModuleRegistry.registerModules([AllCommunityModule]);
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// create an icon override part


// use it in a theme


export const GridData=({...props})=>{
    const icons = useMemo(() => {
        return {
            sortAscending: '<i class=\'bx bx-up-arrow-alt text-[20px] leading-[2]\'></i>',
            sortDescending: '<i class=\'bx bx-down-arrow-alt text-[20px] leading-[2]\' ></i>',

        };
    }, []);

    return(
        <AgGridReact
            style={{ width: '100%', height: '100%' }}

            icons={icons}
            {...props}
        >
        </AgGridReact>

    );
}
