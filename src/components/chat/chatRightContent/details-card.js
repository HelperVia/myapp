import { HvAccordion } from "@components/ui/accordion/Accordion";
import { HvAccordionHeader } from "@components/ui/accordion/AccordionHeader";
import { HvAccordionDetails } from "@components/ui/accordion/AccordionDetails";

import { Chip } from "@mui/material";

export const DetailsCard = (props) => {
  return (
    <HvAccordion
      expanded={props.expanded ? props.expanded : false}
      classes="pt-[12px] pb-[12px] border-b-[1px] border-solid border-hv-color-23"
    >
      <HvAccordionHeader classes="font-semibold text-[16px]">
        {props.title}
        {props.badge && (
          <Chip
            label={props.badge}
            size="small"
            color="secondary"
            sx={{ marginLeft: "5px" }}
          />
        )}
      </HvAccordionHeader>
      <HvAccordionDetails>{props.children}</HvAccordionDetails>
    </HvAccordion>
  );
};
