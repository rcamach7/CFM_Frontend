import CFM from 'schema/api/cfm';

const dialogLocation = CFM.Location.omit(['geoLat', 'geoLng']);

const Fridge = CFM.Fridge.omit([
  'id',
  'verified',
  'tags',
  'location',
  'maintainer',
]).concat(dialogLocation);

const Report = CFM.Report.omit(['timestamp']);

const dialog = { Fridge, Report, Maintainer: CFM.Maintainer };
export default dialog;
