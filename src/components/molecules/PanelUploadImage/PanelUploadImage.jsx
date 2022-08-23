import { Alert, Box, Button, Container, Snackbar, Stack } from '@mui/material';
import { useFormik } from 'formik';
import PreviewImage from './PreviewImage';
import { useState } from 'react';

const PanelUploadImage = (props) => {
  const { onToggleAddPhoto, setPhoto, resetPhoto } = props;
  const formik = useFormik({
    initialValues: { image: null },
    onSubmit: (photo) => {
      setPhoto(photo);
      console.table(photo);
      alert(JSON.stringify(photo, null, 2));
    },
  });

  const [snack, setSnack] = useState({
    open: false,
    type: 'error',
    msg: 'Please select an image file!',
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack({ ...snack, open: false });
  };
  const onCancel = () => {
    resetPhoto();
    onToggleAddPhoto();
  };
  const onAddImage = async (event) => {
    const imageUpload = event.target.files[0];
    const uploadType = imageUpload.type;
    const supportedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!supportedImageTypes.includes(uploadType)) {
      setSnack({ ...snack, open: true });
    } else {
      const imageOut = await convertImage(imageUpload);
      formik.setFieldValue('image', imageOut);
      formik.setTouched({ image: true });
      console.log(imageOut); //@TODO - Make Post Request
      const photoSubmitUrl = process.env.NEXT_PUBLIC_CFM_API_URL + '/v1/image';
      const response = fetch(photoSubmitUrl, {
        method: 'POST',
        body: JSON.stringify(imageOut),
        headers: {
          'Content-Type': 'image/webp',
          accept: 'application/json',
        },
      });
      console.table(response);
    }
    return;
  };

  const convertImage = (image) => {
    return new Promise((resolve) => {
      let src = URL.createObjectURL(image);
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');

      let userImage = new Image();
      userImage.src = src;

      userImage.onload = () => {
        canvas.width = userImage.width;
        canvas.height = userImage.height;
        context.drawImage(userImage, 0, 0);
        // @Todo - I believe canvas.toBlob is more performant,
        // but I was unable to get it to work
        // let webpImage = canvas.toBlob((blob) => {
        //   new File(
        //     [blob],
        //     'fridgeUpdate.webp',
        //     { type: blob.type },
        //     'image/webp'
        //   );
        // });
        let webpImage = canvas.toDataURL('image/webp');
        return resolve(webpImage);
      };
    });
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" justifyContent="center" spacing={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box p={1}>
              <label htmlFor="image">
                <input
                  style={{ display: 'none' }}
                  id="image"
                  name="image"
                  type={'file'}
                  onChange={(event) => onAddImage(event)}
                />
                <Button
                  aria-label="Click here to choose an image to upload."
                  variant="contained"
                  component="span"
                  fullWidth
                >
                  {formik.values.image ? 'Change Photo' : 'Select Photo'}
                </Button>
              </label>
            </Box>
            <Box p={1}>
              <Button
                variant="outlined"
                fullWidth
                onClick={onCancel}
                aria-label="Click here to cancel image upload"
              >
                Cancel
              </Button>
            </Box>
          </Box>
          {formik.values.image && <PreviewImage file={formik.values.image} />}
          {formik.values.image && (
            <Button
              aria-label="Click here to submit the chosen image."
              variant="contained"
              fullWidth={true}
              type="submit"
              name="button"
            >
              Submit
            </Button>
          )}
          <Snackbar
            open={snack.open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snack.type}
              elevation={5}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snack.msg}
            </Alert>
          </Snackbar>
        </Stack>
      </form>
    </Container>
  );
};

export default PanelUploadImage;
