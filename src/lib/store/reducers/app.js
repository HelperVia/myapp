"use client";
import { CHAT_STATUS_ACTIVE } from "../types/Chat";
import { CUSTOMER_OFFLINE } from "../types/Customer";
import { upsert } from "../../helper";

const initialState = {
  connection: false,
  selected_company: "",
  license_number: "",
  starter: false,
  account: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNT": {
      return {
        ...state,
        account: action.data,
      };
    }
    case "SET_DOCUMENT_DEFAULT_TITLE": {
      return {
        ...state,
        document_default_title: action.data,
      };
    }
    case "SET_DOCUMENT_TITLE": {
      return {
        ...state,
        document_title: action.data,
      };
    }

    case "SET_STEP": {
      return {
        ...state,
        configuration_step: action.data,
      };
    }
    case "SET_MENU": {
      return {
        ...state,
        selected_menu: action.data,
      };
    }

    case "SET_AGENT_NAME": {
      return {
        ...state,
        agent_name: action.data,
      };
    }
    case "SET_STARTER": {
      return {
        ...state,
        starter: action.data,
      };
    }
    case "SET_COMPANY": {
      return {
        ...state,
        companies: action.data,
      };
    }

    case "VERIFICATION": {
      return {
        ...state,
        email_verification: action.data,
      };
    }
    case "AUTHENTICATION": {
      return {
        ...state,
        authentication: action.data,
      };
    }

    case "SET_SOUND": {
    }
    case "SET_URL": {
      return {
        ...state,
        url: action.data,
      };
    }
    case "SET_CONNECTION_TOKEN": {
      return {
        ...state,
        connection_token: action.data,
      };
    }

    case "SET_PROCESS": {
      return {
        ...state,
        loading: action.data,
      };
    }
    case "SET_CONNECTION": {
      return {
        ...state,
        connection: action.data,
      };
    }

    case "OVERRIDE_DEPARTMENT": {
      var allDepartments = state.allDepartments;
      for (var values in allDepartments) {
        if (allDepartments[values]["id"] == action.data.id) {
          allDepartments[values] = action.data.data;
        }
      }
      return {
        ...state,
        allDepartments,
      };
    }
    case "OVERRIDE_AGENT": {
      var allAgents = state.allAgents;
      for (var values in allAgents) {
        if (allAgents[values]["id"] == action.data.id) {
          allAgents[values] = action.data.data;
        }
      }

      return {
        ...state,
        allAgents,
      };
    }

    case "UPDATE_AGENT": {
      const agents = state.agents.map((agent) => {
        if (agent.id === action.data.id) {
          const updates = {};
          action.data.update.forEach(({ key, val }) => {
            updates[key] = val;
          });
          return { ...agent, ...updates };
        }
        return agent;
      });

      return {
        ...state,
        agents,
      };
    }

    case "SET_LICENSE_NUMBER": {
      return {
        ...state,
        license_number: action.data,
      };
    }

    case "DELETE_CANNED_RESPONSE": {
      var canned_response = Object.values(state.canned_response);
      for (var values in canned_response) {
        if (canned_response[values][action.data.filter_key] == action.data.id) {
          canned_response.splice(values, 1);
        }
      }
      return {
        ...state,
        canned_response,
      };
    }

    case "UPDATE_CANNED_RESPONSE": {
      var canned_response = state.canned_response;
      for (var values in canned_response) {
        if (canned_response[values][action.data.filter_key] == action.data.id) {
          canned_response[values] = action.data.up;
        }
      }

      return {
        ...state,
        canned_response,
      };
    }

    case "SET_CANNED_RESPONSE": {
      var cannedResponse = {};
      var data = action.data;
      Object.keys(data).forEach((key) => {
        cannedResponse[key] = data[key];
      });

      var dataArr = state.canned_response;
      for (var values in cannedResponse) {
        dataArr.push(cannedResponse[values]);
      }
      return {
        ...state,
        canned_response: dataArr,
      };
    }
    case "SET_ALL_DEPARTMENTS": {
      let ArrMaps = Object.keys(action.data).map(function (key) {
        return action.data[key];
      });
      return {
        ...state,
        departments: ArrMaps,
      };
    }

    case "SET_ALL_AGENTS": {
      let ArrMaps = Object.keys(action.data).map(function (key) {
        return action.data[key];
      });

      /*
                        var allAgentsCopy = {};
                        var data = aaa;
                        Object.keys(data).forEach(key => {
                            allAgentsCopy[data[id]] = data[key];
                        });

                        var dataArr = [];
                        for (var values in allAgentsCopy) {
                            dataArr.push(allAgentsCopy[values]);
                        }
            */

      return {
        ...state,
        agents: ArrMaps,
      };
    }

    case "PUSH_QUEUED_CHAT": {
      activeChatsCopy = Object.values(state.activeChats);
      if (
        typeof activeChatsCopy.find((chat) => chat.id == action.data.id) ===
        "undefined"
      ) {
        activeChatsCopy.unshift(action.data);
      }

      return {
        ...state,
        activeChats: activeChatsCopy,
      };
    }
    case "PUSH_ACTIVE_CHAT": {
      activeChatsCopy = Object.values(state.activeChats);
      if (
        typeof activeChatsCopy.find((chat) => chat.id == action.data.id) ===
        "undefined"
      ) {
        activeChatsCopy.unshift(action.data);
      } else {
        activeChatsCopy.find((chat) => chat.id == action.data.id)["status"] =
          CHAT_STATUS_ACTIVE;
      }

      return {
        ...state,
        activeChats: activeChatsCopy,
      };
    }

    case "NEW_MESSAGE": {
      var activeChats = Object.values(state.activeChats);
      for (var values in activeChats) {
        if (activeChats[values]["id"] == action.data.id) {
          activeChats[values]["messages"].push(action.data.message);
        }
      }

      return {
        ...state,
        activeChats: activeChats,
      };
    }
    case "DELETE_ACTIVE_CHAT": {
      var activeChats = Object.values(state.activeChats);
      for (var values in activeChats) {
        if (activeChats[values][action.data.filter_key] == action.data.id) {
          activeChats.splice(values, 1);
        }
      }
      return {
        ...state,
        activeChats,
      };
    }

    case "UPDATE_MESSAGE": {
      var activeChats = state.activeChats;
      for (var values in activeChats) {
        if (activeChats[values][action.data.filter_key] == action.data.id) {
          for (var message in activeChats[values]["messages"]) {
            for (var values2 in action.data.up) {
              activeChats[values]["messages"][message][
                action.data.up[values2].key
              ] = action.data.up[values2].val;
            }
          }
        }
      }
      return {
        ...state,
        activeChats,
      };
    }
    case "UPDATE_ACTIVE_CHAT": {
      var activeChats = state.activeChats;
      for (var values in activeChats) {
        if (activeChats[values][action.data.filter_key] == action.data.id) {
          for (var values2 in action.data.up) {
            activeChats[values][action.data.up[values2].key] =
              action.data.up[values2].val;
          }
        }
      }
      return {
        ...state,
        activeChats,
      };
    }

    case "PUSH_CUSTOMER": {
      let customers = Object.values(state.customers);
      upsert(customers, action.data, "mid");
      console.log(customers);
      return {
        ...state,
        customers: customers,
      };
    }
    case "CUSTOMER_DISCONNECT": {
      let customers = Object.values(state.customers);
      for (let values in customers) {
        if (customers[values][action.data.filter_key] == action.data.id) {
          if (typeof customers[values]["chat"]["chat_id"] === "undefined") {
            customers.splice(values, 1);
          } else {
            customers[values]["status"] = CUSTOMER_OFFLINE;
          }
        }
      }
      console.log(customers);
      return {
        ...state,
        customers: customers,
      };
    }
    case "DELETE_CUSTOMER": {
      let customers = Object.values(state.customers);
      for (var values in customers) {
        if (customers[values][action.data.filter_key] == action.data.id) {
          customers.splice(values, 1);
        }
      }
      return {
        ...state,
        customers: customers,
      };
    }

    case "SET_CUSTOMERS": {
      console.log(Object.values(action.data));
      return {
        ...state,
        customers: Object.values(action.data),
      };
    }

    case "ARCHIVE_ACTIVE": {
      return {
        ...state,
        archiveStatus: true,
      };
    }
    case "ARCHIVE_PASSIVE": {
      return {
        ...state,
        archiveStatus: false,
      };
    }
    case "REMOVE_ALL_ARCHIVE": {
      var dataArr = [];
      return {
        ...state,
        archiveChats: dataArr,
      };
    }
    case "SET_ALL_ARCHIVE": {
      var archiveChatsCopy = {};
      var data = action.data;
      Object.keys(data).forEach((key) => {
        archiveChatsCopy[key] = data[key];
      });
      var dataArr = [];
      for (var values in archiveChatsCopy) {
        dataArr.push(archiveChatsCopy[values]);
      }
      return {
        ...state,
        archiveChats: dataArr,
      };
    }
    case "SET_ACTIVE_CHAT": {
      var activeChatsCopy = {};
      var data = action.data;
      Object.keys(data).forEach((key) => {
        activeChatsCopy[key] = data[key];
      });
      var dataArr = [];
      for (var values in activeChatsCopy) {
        dataArr.push(activeChatsCopy[values]);
      }
      return {
        ...state,
        activeChats: dataArr,
      };
    }

    case "SET_SETTINGS": {
      var Settings = Object.assign({}, state.settings);
      var data = action.data;
      Object.keys(data).forEach((key) => {
        Settings[key] = data[key];
      });
      return {
        ...state,
        settings: Settings,
      };
    }
    case "SET_CUSTOMER_SUPERVISE": {
      var customers = Object.values(state.customers);
      var findData = customers.find(
        (c) => c.chat.chat_id == action.data.chat_id
      );

      if (typeof findData !== "undefined") {
        for (var values in customers) {
          if (customers[values]["chat"]["chat_id"] == action.data.chat_id) {
            if (typeof action.data.stop !== "undefined") {
              if (
                typeof customers[values]["chat"]["supervised"] !== "undefined"
              ) {
                delete customers[values]["chat"]["supervised"];
              }
            } else {
              customers[values]["chat"]["supervised"] = 1;
            }
          }
        }
      }
      return {
        ...state,
        customers: customers,
      };
    }

    case "SET_SUPERVISE": {
      var Agent = Object.assign({}, state.operator);
      var data = action.data;
      Agent["supervise"] = data;
      return {
        ...state,
        operator: Agent,
      };
    }
    case "SET_OPERATOR": {
      var Agent = Object.assign({}, state.operator);
      var data = action.data;
      Object.keys(data).forEach((key) => {
        Agent[key] = data[key];
      });
      return {
        ...state,
        operator: Agent,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
