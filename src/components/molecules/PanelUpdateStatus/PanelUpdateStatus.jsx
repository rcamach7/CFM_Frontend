import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Slider,
  Radio,
  Stack,
} from '@mui/material';
import React from 'react';
const PanelUpdateStatus = ({
  foodPercentage,
  operation,
  handleChange,
  handleBlur,
}) => {
  //Functionality for MUI slider component
  const sliderMarks = [
    {
      value: 0,
      label: 'Empty',
    },
    {
      value: 33,
      label: 'A Few Items',
    },
    {
      value: 66,
      label: 'Many Items',
    },
    {
      value: 100,
      label: 'Full',
    },
  ];

  const fridgeSliderStyles = {
    mx: 'auto',
    width: 7 / 8,
    '.MuiSlider-markLabel': {
      fontSize: 12,
      // color: theme.palette.text.secondary,
    },
    '.MuiSlider-markLabelActive': {
      fontSize: 12,
      // color: theme.palette.text.primary,
    },
  };

  return (
    <div>
      <Stack
        direction="column"
        spacing={3}
        mt={2}
        justifyContent="space-between"
      >
        <FormGroup>
          <FormLabel>How full is the fridge?</FormLabel>
          <Slider
            name="foodPercentage"
            aria-label="Fridge fullness"
            value={foodPercentage}
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={100}
            step={33}
            marks={sliderMarks}
            sx={fridgeSliderStyles}
            size="medium"
          />
          {/* {formik.errors.foodPercentage && formik.touched.foodPercentage ? ( */}
          {/* <div>{formik.errors.foodPercentage}</div> */}
          {/* ) : null} */}
        </FormGroup>

        <FormLabel>Select if applicable:</FormLabel>
        <FormControl>
          <RadioGroup
            name="operation"
            value={operation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormGroup>
            <FormControlLabel
              control={<Radio />}
              value="out of order"
              label="Fridge needs servicing"
            />
            <FormControlLabel
              control={<Radio />}
              value="dirty"
              label="Fridge needs cleaning"
            />
            <FormControlLabel
              control={<Radio />}
              value="not at location"
              label="Fridge is no longer at location"
            />
          </FormGroup>
        </FormControl>
      </Stack>
    </div>
  );
};

export default PanelUpdateStatus;
