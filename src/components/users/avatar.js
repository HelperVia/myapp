import { grey } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { useAppSelector } from "@store/hooks";
import { extractInitials } from "@lib/helper.func";

export const UserAvatar = ({ props }) => {
  const selector = useAppSelector((state) => state.app);
  return (
    <Avatar sx={{ bgcolor: grey[800] }} variant="square">
      {extractInitials(selector?.account?.full_name)}
    </Avatar>
  );
};
