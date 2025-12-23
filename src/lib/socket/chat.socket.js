import socketIOClient from "socket.io-client";


export const chatSocketIOInit = async (bearer_token)=>{

    let socket=socketIOClient(process.env.NEXT_PUBLIC_REACT_APP_SERVER+"/hv_chat",{
        extraHeaders: {
            Authorization: bearer_token
        }
    });
    return socket;
}
