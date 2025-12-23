import { useAppSelector } from "@store/hooks";
import { UserAvatar } from "./avatar";
import { capitalizeWordsUnicode } from "@lib/helper.func";
export const UserSettings = ({ props }) => {
  const selector = useAppSelector((state) => state.app);

  const logout = () => {};

  const changeSetAway = (e) => {
    /*
        const {socket}=this.context;
        this.setState({
            checked: e.target.checked
        })
        const [checked,response] = await setAway(e.target.checked);
        if (response.status === 200) {
            if(typeof response.data.message.success!=="undefined"){
                socket.emit("away",checked);
                this.props.dispatch({
                    type: 'SET_OPERATOR',
                    data: {away:checked}
                });

            }
        }
         */
  };

  return (
    <div className="hv-user-account-container">
      <ul className="m-0 pt-[6px] pb-[6px] pr-0 pl-0">
        <li className="mt-0 mb-0 mr-[8px] ml-[8px]">
          <a
            type="button"
            className="text-hv-color-13 hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] text-[13px] relative pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
          >
            <div className="flex flex-row">
              <div className="mr-4">
                <UserAvatar />
              </div>
              <div className="flex flex-col">
                <div className=" text-[14px]">
                  {capitalizeWordsUnicode(selector?.account?.full_name)}
                </div>
                <div className="text-[12px]">{selector?.account?.email}</div>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div className="w-[100%] h-[1px] bg-hv-color-21"></div>
      <ul className="m-0 pt-[6px] pb-[6px] pr-0 pl-0">
        <li className="mt-0 mb-0 mr-[8px] ml-[8px]">
          <a
            type="button"
            className="text-hv-color-13 hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] text-[13px] relative pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
          >
            <div className="settings-control flex justify-between w-[100%]">
              Accept Chats
              <label className="switch">
                <input
                  type="checkbox"
                  className="setAway"
                  checked={false}
                  onChange={changeSetAway}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </a>
        </li>
      </ul>
      <div className="w-[100%] h-[1px] bg-hv-color-21"></div>
      <ul className="m-0 pt-[6px] pb-[6px] pr-0 pl-0">
        <li className="mt-0 mb-0 mr-[8px] ml-[8px]">
          <a
            type="button"
            onClick={logout()}
            className="text-hv-color-13 hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] text-[13px] relative pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
