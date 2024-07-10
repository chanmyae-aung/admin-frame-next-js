import * as React from "react";
import {
  CheckboxProps as MCheckboxProps,
  Checkbox as MCheckbox,
  styled
} from "@mui/material";

interface CheckboxProps extends MCheckboxProps {}

const CheckboxStyled = styled(MCheckbox)<{}>(({ theme }) => ({}));

const Checkbox: React.FC<CheckboxProps> = ({ ...rest }) => {
  return <CheckboxStyled {...rest} />;
};

export default Checkbox;
