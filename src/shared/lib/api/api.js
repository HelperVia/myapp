
import axios from 'axios';

import Cookies from "js-cookie";




const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_SERVICE,
    timeout: 100000,
});

const removeCookies=()=>{
    if(typeof Cookies.get(process.env.NEXT_PUBLIC_APP_PREFIX+'_token')!=="undefined"){
        Cookies.remove(process.env.NEXT_PUBLIC_APP_PREFIX+'_token');
    }
    if(typeof Cookies.get(process.env.NEXT_PUBLIC_APP_PREFIX+'_app_license_number')!=="undefined"){
        Cookies.remove(process.env.NEXT_PUBLIC_APP_PREFIX+'_app_license_number');
    }
}

AxiosInstance.interceptors.request.use((conf) => {

    console.log(Cookies.get('hv_token'));
    const newConf = { ...conf };
    newConf.data.append(process.env.NEXT_PUBLIC_APP_PREFIX+"_token",Cookies.get(process.env.NEXT_PUBLIC_APP_PREFIX+'_token'));
    newConf.data.append("license_number",Cookies.get(process.env.NEXT_PUBLIC_APP_PREFIX+'_app_license_number'));

    newConf.headers['content-type'] = "application/x-www-form-urlencoded";
    newConf.params = conf.params || {};

    console.log(newConf);
    return newConf;
});

AxiosInstance.interceptors.response.use(
    (response) => {

        if(process.env.DEBUG=="FALSE"){
            if(typeof response.data.authentication==="undefined"){
                removeCookies();
            }else{
                if(response.data.authentication===false){
                    removeCookies();
                }
            }
        }

        return response;
    },
    (error) => {

        if (error.response.status === 403) {
            removeCookies();
            window.location.reload();
        }

        else{
            return Promise.reject(error);
        }

    },
);

export default AxiosInstance;
