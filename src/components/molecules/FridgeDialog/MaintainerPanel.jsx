import { useFormik } from 'formik';
import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  TextField,
} from '@mui/material';

import dialog from '../../../schema/dialog';

export default function MaintainerPanel(props) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      organization: '',
      phone: '',
    },
    validationSchema: dialog.Maintainer,
    onSubmit: (values) => {
      props.handleNext(1, values);
    },
  });

  console.log(dialog.Maintainer);

  return (
    <>
      <StepLabel>Maintainer Contact Information</StepLabel>
      <StepContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={3} mx={4} mb={4}>
            <TextField
              id="name"
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
            />
            <TextField
              id="organization"
              name="organization"
              label="Organization"
              value={formik.values.organization}
              onChange={formik.handleChange}
              error={
                formik.touched.organization &&
                Boolean(formik.errors.organization)
              }
              helperText={
                formik.touched.organization && formik.errors.organization
              }
              variant="outlined"
            />
            <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              variant="outlined"
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
