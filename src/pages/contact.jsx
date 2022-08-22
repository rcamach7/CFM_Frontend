import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Stack, TextField, Typography } from '@mui/material';

import { NextLinkAnchor } from 'components/atoms';
import { ButtonLink } from 'components/molecules';
import { FeedbackMessage } from 'components/atoms';

import schema from '#schema/dialog/index.js';

export default function Contact() {
  const [status, setStatus] = useState(0);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: schema.Contact,
    onSubmit: (values) => {
      const fridgeUrl = process.env.NEXT_PUBLIC_CFM_API_URL + '/v1/contact/';
      fetch(fridgeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((res) => setStatus(res.status))
        .catch((err) => setStatus(err.status));
    },
  });

  return !status ? (
    <Stack spacing={4} mx={4} mt={15} mb={4}>
      <Typography variant="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Contact us!
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing={5} mx={4} mb={4}>
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
            id="email"
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
          />
          <TextField
            id="subject"
            name="subject"
            label="Subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
            variant="outlined"
          />
          <TextField
            id="message"
            name="message"
            label="Message"
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            multiline
            rows={4}
            variant="outlined"
          />
          <Stack direction="row" justifyContent="center" spacing={4} pt={4}>
            <ButtonLink
              aria-label="Click to return to home page"
              variant="outlined"
              to="/"
            >
              Cancel
            </ButtonLink>
            <Button
              aria-label="Click to send an email to the site maintainers"
              variant="contained"
              type="submit"
            >
              Send Email
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  ) : (
    <FeedbackMessage type={status === 201 ? 'EmailSuccess' : 'EmailError'} />
  );
}
