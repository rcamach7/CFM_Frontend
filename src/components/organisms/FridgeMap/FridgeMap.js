import * as ReactDOMServer from 'react-dom/server';
import { MapContainer, TileLayer, Marker, CircleMarker } from 'react-leaflet';
import { Container, Box } from '@mui/system';
import Leaflet from 'leaflet';
import { MapPinIcon } from '../../../theme/icons/';
import { useState, useEffect } from 'react';

const FridgeMap = (props) => {
  const { fridgeData } = props;
  const defaultLocation = [40.70580857568261, -73.99646699561376]; // Brooklyn Bridge

  const fullColor = '#5eb66e';
  const serviceColor = '#ff8484';
  const emptyColor = '#ffffff';

  const fridgeFullIcon = Leaflet.divIcon({
    className: 'dummy',
    html: ReactDOMServer.renderToString(<MapPinIcon fill={fullColor} />),
  });

  const fridgeEmptyIcon = Leaflet.divIcon({
    className: 'dummy',
    html: ReactDOMServer.renderToString(<MapPinIcon fill={emptyColor} />),
  });

  const fridgeServiceIcon = Leaflet.divIcon({
    className: 'dummy',
    html: ReactDOMServer.renderToString(<MapPinIcon fill={serviceColor} />),
  });
  // Testing with borough, because fridge
  // status isn't part of sample data set

  const fridgeStatusSwitch = (borough) => {
    switch (borough) {
      case 'Brooklyn':
        return fridgeServiceIcon;
      case 'Queens':
        return fridgeEmptyIcon;
      default:
        return fridgeFullIcon;
    }
  };

  const fridgeArray =
    Object.keys(fridgeData).length > 1 &&
    Object.entries(fridgeData).map((entry) => entry[1]);

  const fridgeMarkers =
    fridgeArray.length > 1 &&
    fridgeArray.map((fridge, i) => {
      console.log(fridge);
      const { lat, lng, borough } = fridge;
      const location = [lat, lng];
      console.log(location);
      return (
        <Marker position={location} icon={fridgeStatusSwitch(borough)} key={i}>
          Test
        </Marker>
      );
    });

  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <MapContainer
        style={{ height: '100vh' }}
        center={defaultLocation}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        {fridgeMarkers}
      </MapContainer>
    </Container>
  );
};

export default FridgeMap;
