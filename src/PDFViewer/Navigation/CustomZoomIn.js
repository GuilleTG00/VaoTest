import PropTypes from 'prop-types';
import React from 'react';

import ZoomInIcon from '@mui/icons-material/ZoomIn';

const CustomZoomIn = ({
  handleZoomIn,
}) => (
  <div className="zoomButtonContainer"
  >
    <ZoomInIcon
      className="navbarIcons"
      onClick={handleZoomIn}
      size="sm"
    />
  </div >
);

CustomZoomIn.propTypes = {
  handleZoomIn: PropTypes.func.isRequired,
};

export default (CustomZoomIn);