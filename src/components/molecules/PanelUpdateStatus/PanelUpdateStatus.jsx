import {
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
  Slider,
  Stack,
} from '@mui/material';
import React from 'react';
const PanelUpdateStatus = (props) => {
  //Functionality for MUI slider component
  const sliderMarks = [
    {
      value: 0,
      label: 'Empty',
    },
    {
      value: 25,
      label: 'A Few Items',
    },
    {
      value: 50,
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
      color: theme.palette.text.secondary,
    },
    '.MuiSlider-markLabelActive': {
      fontSize: 12,
      color: theme.palette.text.primary,
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
        <FormLabel>How full is the fridge?</FormLabel>
        <FormGroup>
          <Slider
            name="foodPercentage"
            aria-label="Fridge fullness"
            value={formik.values.foodPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min={0}
            max={100}
            step={25}
            marks={sliderMarks}
            sx={fridgeSliderStyles}
            size="medium"
          />
          {formik.errors.foodPercentage && formik.touched.foodPercentage ? (
            <div>{formik.errors.foodPercentage}</div>
          ) : null}
        </FormGroup>
        <FormControl>
          <FormLabel>Select if applicable:</FormLabel>
          <RadioGroup
            name="operation"
            value={formik.values.operation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormControl>
      </Stack>
    </div>
  );
};

export default PanelUpdateStatus;
