import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      <Box sx={{ width: "100%", position: "absolute", top: 0 }}>
        <LinearProgress color="brandGrey" />
      </Box>
    </div>
  );
}
