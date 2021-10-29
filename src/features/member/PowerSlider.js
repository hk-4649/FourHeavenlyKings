import React from "react";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import styles from "./member.module.css";

export const PowerSlider = (props) => {
  const { value, onChange, label } = props;
  return (
    <Box sx={{ width: 150 }}>
      <label className={styles.label}>{label}</label>
      <Slider value={value} onChange={onChange} step={1} min={0} max={5} />
    </Box>
  );
};
