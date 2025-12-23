"use client"
import {createTheme} from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const defaultTheme = createTheme({
    spacing: 8,

    components: {

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor:'#1C252E'
                        },
                    }
                },
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: ' 0 0 2px 0 rgba(145 158 171 / 0.2), 0 12px 24px -4px rgba(145 158 171 / 0.12) ',
                    borderRadius:'16px',


                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {

                    paddingTop: '8px',
                    paddingBottom:'40px',
                    '@media (min-width: 1200px)': {
                        paddingLeft: '40px',
                        paddingRight:'40px',
                    },

                },
            },
        },
        MuiAutocomplete: {
            defaultProps: {
                IconComponent: ExpandMoreIcon,
                //there are tons of props that you can override
            },
            styleOverrides: {
                option: {


                },
            },
        },
        MuiSelect: {
            defaultProps: {
                IconComponent: ExpandMoreIcon,
                //there are tons of props that you can override
            },

        },
        MuiRadio:{
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color:'#FA541C',

                    },
                },
            },
        },
        MuiCheckbox:{
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color:'#FA541C',

                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#1C252E',
                    height: 2,
                },
                flexContainer: {
                    gap:"20px"
                }

            },
        },
        MuiTab: {
            styleOverrides: {
                root: {

                    '&.Mui-selected': {
                        fontWeight: '600',
                    },
                    '&.MuiButtonBase-root': {
                        color: '#1C252E',
                        alignItems:'start',
                        paddingLeft:'0px',
                        paddingRight:'0px',
                        minWidth:'auto'
                    },




                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...ownerState.color === 'menu' && {
                        '&:hover': {
                            color:'inherit',
                            backgroundColor:'rgba(145 158 171 / 0.08)'
                        },
                        '&:focus': {
                            color:'inherit'
                        }
                    },
                    borderRadius: "8px",
                    fontWeight: 600
                })

            },
        },

        MuiFormLabel:{
            styleOverrides: {
                root: {
                    fontSize:"14px",
                    "&.Mui-focused": {
                        color:'#1C252E'
                    }
                },
            },
        },
        MuiDivider:{
            styleOverrides: {
                root: {
                    fontWeight:"bold",
                    textAlign:"left",
                    borderStyle:'dashed',
                    borderColor:'var(--divider)'
                },
            },
        },
        MuiTypography:{
            styleOverrides: {
                root: {

                    color:'#1C252E',
                    "&.MuiTypography-subtitle1": {
                        fontWeight:600,
                    },
                    "&.MuiTypography-subtitle": {
                        fontSize:"1.0625rem",
                        fontWeight:600,
                        display:'block',

                    },

                    "&.MuiTypography-body2": {

                        fontWeight:400,
                        color:'#637381'
                    }

                },
            },
        },


    },
    cssVariables: { cssVarPrefix: 'hv', colorSchemeSelector: 'class' },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        orange: {
            lighter:"#FEE9D1",
            light:"#FDAB76",
            main:"#FA541C",
            dark:"#B3200E",
            darker:"#770508",
            contrastText:"#ffffff",
        },
        green: {
            lighter:"#C8FAD6",
            light:"#5BE49B",
            main:"#00A76F",
            dark:"#007867",
            darker:"#004B50",
            contrastText:"#ffffff",
        },
        warning: {
            lighter:"#FFF5CC",
            light:"#FFD666",
            main:"#FFAB00",
            dark:"#B76E00",
            darker:"#7A4100",
            contrastText:"#1C252E",
        },
        grey: {
            lighter:"#919EAB",
            light:"#637381",
            main:"#1C252E",
            dark:"#454F5B",
            darker:"#141A21",
            contrastText:"#fff",
        },
        secondary: {
            lighter:"#919EAB",
            light:"#555e68",
            main:"#f0f4f8",
            dark:"#f0f4f8",
            contrastText:"#202427",
        },
        menu: {
            light:"#555e68",
            main:"#919EAB",
            dark:"transparent",
            contrastText:"#919EAB",
        }
    },
});
