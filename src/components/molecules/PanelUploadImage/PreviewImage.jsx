import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const PreviewImage = ({ file, width = 300, height = 350 }) => {
  const [preview, setPreview] = useState(null);
  // const reader = new FileReader();

  // let input = file.target;
  // console.table(input)
  // reader.readAsDataURL(input.files[0]);

  // reader.onload = () => {
  //     setPreview(reader.result);
  //   };

  // useEffect(() => {

  //   console.table(file)
  // }, [file])

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: 1,
      }}
    >
      {/* <img src={file} alt="Preview" width={'100%'} height="auto" /> */}
      <Image
        src={file}
        alt="Fridge contents preview"
        width={width}
        height={height}
        objectFit="cover"
      />
    </Container>
  );
};

export default PreviewImage;
