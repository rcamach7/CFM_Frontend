import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { Typography, Button, Box } from '@mui/material';

export default function MascotCard({ img, title, text, link, buttonTitle }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', md: 'space-evenly' },
        alignItems: 'center',
      }}
      p={2}
    >
      <Image {...img} layout="fixed" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3" pt={1} textAlign="center">
          {title}
        </Typography>
        <Typography
          variant="body1"
          p={2}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: '450px',
          }}
        >
          {text}
        </Typography>
        <Link href={link} passHref mt="auto">
          <Button component="a" variant="outlined" fullWidth={true}>
            {buttonTitle || 'LEARN MORE'}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

const imgShape = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

MascotCard.propTypes = {
  img: PropTypes.shape(imgShape).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  type: PropTypes.string,
};
