import { useEffect, useState } from "react";
import { chatSocketIOInit } from "@lib/socket/chat.socket";
import { SocketContext } from "./socket.context";

import { useAppSelector, useAppDispatch, useAppStore } from "@store/hooks";
import { setConnection } from "@store/app/app.slice";
export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnectedChat, setConnectedChat] = useState(false);
  let token = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const connect = async () => {
    if (!isConnectedChat) {
      console.log(token?.connection_token);
      let s = await chatSocketIOInit(token?.connection_token);
      setSocket(s);
    }
  };

  useEffect(() => {
    if (socket != null) {
      socket.on("connect", () => {
        console.log("socket connect");
        dispatch(setConnection(true));
      });

      socket.on("connect_error", (error) => {
        console.log(error);
        dispatch({
          type: "SET_CONNECTION",
          data: false,
        });
      });

      socket.on("newDepartmentAdded", () => {});
      socket.on("newAgentAdded", () => {});

      socket.on("updatedDepartment", (data) => {
        if (typeof data.data.departments[0] !== "undefined") {
          dispatch({
            type: "OVERRIDE_DEPARTMENT",
            data: { id: data.i, data: data.data.departments[0] },
          });
        }
      });
      socket.on("updateOperator", (data) => {
        dispatch({
          type: "OVERRIDE_AGENT",
          data: { id: data.i, data: data.data },
        });
      });

      socket.on("updateOperatorForKey", (data) => {
        dispatch({
          type: "UPDATE_AGENT",
          data: { id: data.id, key: data.key, val: data.val },
        });
      });

      socket.on("connectOperators", (id) => {
        dispatch({
          type: "UPDATE_AGENT",
          data: { id: id, key: "status", val: 1 },
        });
      });
      socket.on("disconnectOperators", (id) => {
        dispatch({
          type: "UPDATE_AGENT",
          data: { id: id, key: "status", val: 0 },
        });
      });

      socket.on("queued_visitor", (data) => {
        if (typeof data.chat !== "undefined") {
          if (typeof data.chat.id !== "undefined") {
          }
        }
      });
      socket.on("read_customer_message", (data) => {
        if (typeof data.chat_id !== "undefined") {
          dispatch({
            type: "UPDATE_MESSAGE",
            data: {
              id: data.chat_id,
              filter_key: "id",
              up: [{ key: "read_user_state", val: 1 }],
            },
          });
        }
      });
      socket.on("read_agent_message", (data) => {
        if (typeof data.chat_id !== "undefined") {
          dispatch({
            type: "UPDATE_MESSAGE",
            data: {
              id: data.chat_id,
              filter_key: "id",
              up: [{ key: "read_agent_state", val: 1 }],
            },
          });
        }
      });
      socket.on("customer:message:typing", (data) => {
        if (typeof data.chat_id !== "undefined") {
          dispatch({
            type: "UPDATE_ACTIVE_CHAT",
            data: {
              id: data.chat_id,
              filter_key: "id",
              up: [
                { key: "typing", val: 1 },
                { key: "typingMessage", val: data.message },
              ],
            },
          });
        }
      });
      socket.on("chat_vote_update", (data) => {
        if (typeof data.chat_id !== "undefined") {
          dispatch({
            type: "UPDATE_ACTIVE_CHAT",
            data: {
              id: data.chat_id,
              filter_key: "id",
              up: [{ key: "vote", val: { vote: data.vote } }],
            },
          });
        }
      });
      socket.on("new_message", (data) => {
        if (typeof data.chat_id !== "undefined") {
          if (typeof data.message !== "undefined") {
            if (data.message.receiver != "1") {
            }

            dispatch({
              type: "NEW_MESSAGE",
              data: {
                id: data.chat_id,
                message: data.message,
              },
            });
          }
        }

        if (typeof data.last_message !== "undefined") {
          if (typeof data.chat_id !== "undefined") {
            dispatch({
              type: "UPDATE_ACTIVE_CHAT",
              data: {
                id: data.chat_id,
                filter_key: "id",
                up: [{ key: "last_message", val: data.last_message }],
              },
            });
          }
        }
      });
      socket.on("customer:message:NoTyping", (data) => {
        if (typeof data.chat_id !== "undefined") {
          dispatch({
            type: "UPDATE_ACTIVE_CHAT",
            data: {
              id: data.chat_id,
              filter_key: "id",
              up: [
                { key: "typing", val: 0 },
                { key: "typingMessage", val: "" },
              ],
            },
          });
        }
      });

      socket.on("pick_from_chat", (data) => {
        if (typeof data !== "undefined") {
          dispatch({
            type: "UPDATE_ACTIVE_CHAT",
            data: {
              id: data,
              filter_key: "id",
              up: [{ key: "status", val: "A" }],
            },
          });
          socket.emit("join_chat_room", { chat_id: data });
        }
      });
      socket.on("queue_visitor_assigned", (data) => {
        if (typeof data !== "undefined") {
          dispatch({
            type: "DELETE_ACTIVE_CHAT",
            data: { id: data, filter_key: "id" },
          });
        }
      });

      socket.on("stop_supervise", (data) => {
        if (typeof data.chat_id !== "undefined") {
          dispatch({
            type: "SET_SUPERVISE",
            data: data.supervise,
          });

          if (typeof data.close_chat === "undefined") {
            dispatch({
              type: "DELETE_ACTIVE_CHAT",
              data: { id: data.chat_id, filter_key: "id" },
            });
          }

          data["stop"] = 1;
          dispatch({
            type: "SET_CUSTOMER_SUPERVISE",
            data: data,
          });

          socket.emit("leave_supervise_chat_room", data.chat_id);
        }
      });
      socket.on("close_chat_room_self", (data) => {
        if (typeof data.chat_id !== "undefined") {
          dispatch({
            type: "DELETE_ACTIVE_CHAT",
            data: { id: data.chat_id, filter_key: "id" },
          });
        }
      });
      socket.on("close_chat_room", (data) => {
        if (typeof data.chat_id !== "undefined") {
          if (
            typeof data.agent !== "undefined" ||
            typeof data.pending !== "undefined"
          ) {
            dispatch({
              type: "DELETE_ACTIVE_CHAT",
              data: { id: data.chat_id, filter_key: "id" },
            });
          } else {
            dispatch({
              type: "UPDATE_ACTIVE_CHAT",
              data: {
                id: data.chat_id,
                filter_key: "id",
                up: [{ key: "user_closed", val: 1 }],
              },
            });
          }

          if (typeof data.pending === "undefined") {
            socket.emit("leave_chat_room", data.chat_id);
          }
        }
      });
      socket.on("incoming_supervise", (data) => {
        if (typeof data.supervise !== "undefined") {
          dispatch({
            type: "SET_SUPERVISE",
            data: data.supervise,
          });
          if (typeof data.chat_id !== "undefined") {
            dispatch({
              type: "SET_CUSTOMER_SUPERVISE",
              data: data,
            });
          }
          if (typeof data.chat !== "undefined") {
            dispatch({
              type: "PUSH_ACTIVE_CHAT",
              data: data.chat,
            });
          }
          socket.emit("join_supervise_chat_room", { chat_id: data.chat.id });
        }
      });

      socket.on("incoming_chat", (data) => {
        if (typeof data.chat !== "undefined") {
          if (typeof data.chat.id !== "undefined") {
            socket.emit("join_chat_room", { chat_id: data.chat.id });

            dispatch({
              type: "PUSH_ACTIVE_CHAT",
              data: data.chat,
            });
            dispatch({
              type: "SET_SOUND",
              data: {
                playing: true,
                type: "incomingChat",
              },
            });
          }
        }
      });
      socket.on("updateUser", (data) => {
        /*
                console.log("updateUser");
                if(typeof data.mid!=="undefined"){
                    dispatch({
                        type: "PUSH_CUSTOMER",
                        data: {mid: data.mid, data: data}
                    });

                }
*/
      });

      socket.on("customer:all:set", (users) => {
        dispatch({
          type: "SET_CUSTOMERS",
          data: users,
        });
      });
      socket.on("customer:disconnect", (user) => {
        dispatch({
          type: "CUSTOMER_DISCONNECT",
          data: { id: user, filter_key: "id" },
        });
      });
      socket.on("customer:connect", (data) => {
        dispatch({
          type: "PUSH_CUSTOMER",
          data: data,
        });
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connect, isConnectedChat }}>
      {children}
    </SocketContext.Provider>
  );
}
