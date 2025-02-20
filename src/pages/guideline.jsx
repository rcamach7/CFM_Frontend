import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { FileDownloadOutlined as DownloadIcon } from '@mui/icons-material';

const data = [
  {
    title: 'Providing Food',
    content: [
      'Aliquet laoreet at augue pretium consequat tortor volutpat. ',
      'Sit lectus amet nunc cras. Condimentum feugiat urna auctor non nunc diam at. ',
      'Purus ac id adipiscing vitae quam lacus, tellus eget mattis. ',
      'Integer consectetur venenatis adipiscing morbi risus aenean. ',
      'Molestie dui viverra eu id pellentesque commodo egestas. ',
      'Tellus suscipit sodales sagittis ut. ',
      'Sagittis quam mauris scelerisque eget tempus integer.',
      'Purus ac id adipiscing vitae quam lacus, tellus eget mattis. ',
    ],
  },
  {
    title: 'Receiving Food',
    content: [
      'Volutpat tortor consequat pretium augue at laoreet aliquet.',
      'At diam nunc non auctor urna feugiat condimentum cras nunc amet lectus sit.',
      'Mattis eget tellus lacus quam vitae adipiscing id ac purus.',
      'Aenean risus morbi adipiscing venenatis consectetur integer.',
      'Egestas commodo pellentesque id eu viverra dui molestie.',
      'Ut sagittis sodales suscipit tellus.',
      'Mattis eget tellus lacus quam vitae adipiscing id ac integer.',
      'Purus tempus eget scelerisque mauris quam saggitis.',
    ],
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <ol>{children}</ol>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-panel-${index}`,
  };
}

export default function GuidelinePage() {
  const [panel, setPanel] = React.useState(0);

  const handleChange = (event, newValue) => {
    setPanel(newValue);
  };

  return (
    <React.Fragment>
      <Typography sx={{ ml: 4 }} variant="h1">
        Best Practices:
      </Typography>
      <Tabs
        sx={{ mx: 4 }}
        value={panel}
        onChange={handleChange}
        aria-label="guidelines tabs"
        variant="fullWidth"
        textColor="primary"
      >
        {data.map((val, index) => (
          <Tab
            key={`tab-title-${val.title}`}
            label={val.title}
            sx={{ textTransform: 'none' }}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {data.map((val, index) => (
        <TabPanel key={`${val.title}-${index}`} value={panel} index={index}>
          {val.content.map((item, i) => (
            <li key={`tab-content-${val.title}-${i}`}>
              <Typography>{item}</Typography>
            </li>
          ))}
        </TabPanel>
      ))}
      <Box textAlign="center" sx={{ px: 4 }}>
        <Button
          variant="contained"
          sx={{
            width: { xs: '100%', sm: 'inherit', md: 'inherit' },
            px: 15,
            mb: 5,
          }}
          startIcon={<DownloadIcon />}
        >
          Download PDF
        </Button>
      </Box>
    </React.Fragment>
  );
}
