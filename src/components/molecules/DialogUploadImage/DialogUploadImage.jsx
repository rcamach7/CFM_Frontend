import { Alert, Box, Button, Container, Snackbar, Stack } from '@mui/material';
import { useFormik } from 'formik';
import PreviewImage from './PreviewImage';
import { useState } from 'react';

const DialogUploadImage = (props) => {
  const { onToggleUpload } = props;
  const formik = useFormik({
    initialValues: { image: null },
    onSubmit: (values) => {
      console.table(values);
      alert(JSON.stringify(values, null, 2));
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
    onToggleUpload();
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
    }
    console.log(imageUpload.type);
    const imageOut = await convertImage(imageUpload);
    formik.setFieldValue('image', imageOut);
    formik.setTouched({ image: true });
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
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Box p={1} sx={{ width: 1 / 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={onCancel}
                aria-label="Click here to cancel image upload"
              >
                Cancel
              </Button>
            </Box>
            <Box p={1} sx={{ width: 1 / 2 }}>
              <label htmlFor="image" sx={{ width: 1 / 2 }}>
                <input
                  style={{ display: 'none' }}
                  id="image"
                  name="image"
                  type={'file'}
                  onChange={(event) => onAddImage(event)}
                />
                <Button
                  fullWidth
                  aria-label="Click here to choose an image to upload."
                  variant="contained"
                  component="span"
                >
                  {formik.values.image ? 'Change Photo' : 'Upload Photo'}
                </Button>
              </label>
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

export default DialogUploadImage;
