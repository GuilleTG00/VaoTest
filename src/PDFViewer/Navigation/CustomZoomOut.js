import PropTypes from 'prop-types';
import React from 'react';

import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const CustomZoomOut = ({
  handleZoomOut,
}) => (
  <div 
    className="zoomButtonContainer"
  >
    <ZoomOutIcon
      className="navbarIcons"
      onClick={handleZoomOut}
      size="sm"
    />
  </div>
);

CustomZoomOut.propTypes = {
  handleZoomOut: PropTypes.func.isRequired,
};

export default (CustomZoomOut);