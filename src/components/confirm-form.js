import React from "react";
import { ModalContext } from "@components/ui/modal/context/Context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";

export const ConfirmForm = ({
  title,
  subtitle = "",
  confirmComponent = <React.Fragment></React.Fragment>,
}) => {
  const { modal, setModal } = React.use(ModalContext);
  const cancel = () => {
    setModal({
      open: false,
    });
  };

  return (
    <Grid
      size={12}
      alignItems="center"
      justifyContent="center"
      spacing={3}
      container
    >
      <Box>
        <img className="w-[100px]" src="/icons/warning.svg" />
      </Box>
      <Grid size={12} alignItems="center" justifyContent="center" container>
        <Tooltip title={title}>
          <Typography noWrap variant="subtitle1">
            {title}
          </Typography>
        </Tooltip>
        {subtitle != "" && (
          <Typography center className="text-center" variant="body2">
            {subtitle}
          </Typography>
        )}
      </Grid>
      <Grid
        size={12}
        alignItems="center"
        justifyContent="center"
        display="flex"
        rowSpacing={3}
        direction="row"
        columnSpacing={3}
        container
      >
        <Button onClick={cancel} color="brandGrey" variant="outlined">
          Cancel
        </Button>
        {confirmComponent}
      </Grid>
    </Grid>
  );
};
