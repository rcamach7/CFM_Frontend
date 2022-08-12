import { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import theme from 'theme';

import { Report } from 'schema/dialog';

import { PanelUpdateStatus, PanelUploadImage } from 'components/molecules';

export default function DialogFridgeReport({
  fridgeName = 'Community Fridge Name',
}) {
  //Initialize Formik form and initial form values
  const formik = useFormik({
    initialValues: {
      foodPhotoURL: null,
      foodPercentage: 0,
      operation: 'good',
      notes: '',
    },
    validationSchema: Report,
    onSubmit: (values) => {
      console.table(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  // Toggle visibility of photo upload component
  const [state, setState] = useState({
    uploadPhoto: false,
  });
  const { uploadPhoto } = state;

  const onToggleAddPhoto = () => {
    setState({ ...state, uploadPhoto: !state.uploadPhoto });
  };

  const setPhoto = (photo) => {
    formik.setFieldValue(foodPhotoURL, photo);
  };

  const resetPhoto = () => {
    formik.setFieldValue(foodPhotoURL, null);
  };

  // Functionality for MUI stepper component
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
    <Container>
      <Stack direction="column" spacing={4} mx={4} mb={4}>
        <Box id="update-header">
          <Typography variant="h2">Community Fridge Update:</Typography>
          <Typography variant="h5">{fridgeName}</Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Stepper activeStep={activeStep} orientation={'vertical'}>
            <Step>
              <StepLabel>Upload Photo</StepLabel>
              <StepContent>
                <Stack
                  direction="column"
                  spacing={3}
                  mt={2}
                  justifyContent="space-between"
                >
                  {uploadPhoto ? (
                    <PanelUploadImage
                      onToggleAddPhoto={onToggleAddPhoto}
                      setPhoto={setPhoto}
                      resetPhoto={resetPhoto}
                    />
                  ) : (
                    <>
                      <Typography>
                        If you have a photo of the fridge contents, you can
                        upload that here. If you don&#39;t have one, select SKIP
                        PHOTO.
                      </Typography>
                      <Button
                        onClick={onToggleAddPhoto}
                        variant="contained"
                        startIcon={<AddAPhotoRoundedIcon />}
                      >
                        Upload Photo
                      </Button>
                      <Button onClick={handleNext} variant="outlined">
                        Skip Photo
                      </Button>
                    </>
                  )}
                </Stack>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Status</StepLabel>
              <StepContent>
                <Stack
                  direction="column"
                  spacing={3}
                  mt={2}
                  justifyContent="space-between"
                >
                  <PanelUpdateStatus
                    foodPercentage={formik.values.foodPercentage}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    operation={formik.values.operation}
                  />
                  <Button onClick={handleNext} variant="contained" fullWidth>
                    Continue
                  </Button>
                  <Button onClick={handleBack} variant="outlined" fullWidth>
                    Back
                  </Button>
                </Stack>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Notes</StepLabel>
              <StepContent>
                <Stack
                  spacing={3}
                  mt={2}
                  direction="column"
                  justifyContent="space-between"
                >
                  <TextField
                    name="notes"
                    value={formik.values.notes}
                    id="notes"
                    placeholder="Got an update or request? Leave your notes here!"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    multiline
                    rows={5}
                    fullWidth
                  />
                  {formik.errors.notes ? (
                    <div>{formik.errors.notes}</div>
                  ) : null}
                  <Button onClick={handleNext} variant="contained" fullWidth>
                    Continue
                  </Button>
                  <Button onClick={handleBack} variant="outlined" fullWidth>
                    Back
                  </Button>
                </Stack>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Confirm</StepLabel>
              <StepContent>
                <Stack
                  mt={2}
                  spacing={3}
                  justifyContent="space-between"
                  direction="column"
                >
                  <Typography>
                    If all the details are correct, please select CONFIRM.
                  </Typography>
                  <Button type="submit" variant="contained" fullWidth>
                    Confirm
                  </Button>
                  <Button onClick={handleBack} variant="outlined" fullWidth>
                    Back
                  </Button>
                </Stack>
              </StepContent>
            </Step>
          </Stepper>
        </form>
      </Stack>
    </Container>
  );
}
DialogFridgeReport.propTypes = {
  fridgeName: PropTypes.string.isRequired,
};
