import { useFormik } from 'formik';
import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  TextField,
} from '@mui/material';

import schema from '#schema/dialog/index.js';

export default function FridgePanel(props) {
  const formik = useFormik({
    initialValues: {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      website: '',
      instagram: '',
      notes: '',
    },
    validationSchema: schema.Fridge,
    onSubmit: (values) => {
      props.handleNext(0, values);
    },
  });

  return (
    <>
      <StepLabel>Fridge Location Information</StepLabel>
      <StepContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={3} mx={4} mb={4}>
            <TextField
              id="name"
              name="name"
              label="Name of Fridge"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
            />
            <TextField
              id="street"
              name="street"
              label="Street Address"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
              variant="outlined"
            />
            <TextField
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              variant="outlined"
            />
            <TextField
              id="state"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              variant="outlined"
            />
            <TextField
              id="zip"
              name="zip"
              label="Zip Code"
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
              variant="outlined"
            />
            <TextField
              id="website"
              name="website"
              label="Website"
              value={formik.values.website}
              onChange={formik.handleChange}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
              variant="outlined"
            />
            <TextField
              id="instagram"
              name="instagram"
              label="Instagram"
              value={formik.values.instagram}
              onChange={formik.handleChange}
              error={
                formik.touched.instagram && Boolean(formik.errors.instagram)
              }
              helperText={formik.touched.instagram && formik.errors.instagram}
              variant="outlined"
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              value={formik.values.notes}
              onChange={formik.handleChange}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
              multiline
              rows={4}
              variant="outlined"
            />
            <Stack
              direction={{ md: 'row-reverse', xs: 'column' }}
              justifyContent="space-between"
              spacing={4}
              pt={4}
            >
              <Button
                aria-label="Click to continue to the next panel"
                variant="contained"
                type="submit"
                sx={{ py: 3, px: { md: 20 }, border: '2px solid transparent' }}
              >
                Next
              </Button>
              <Button
                aria-label="Click to return to the preview panel"
                variant="outlined"
                onClick={props.handleBack}
                sx={{ py: 3, px: { md: 20 } }}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        </form>
      </StepContent>
    </>
  );
}
