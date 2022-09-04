import PropTypes from 'prop-types';
import React from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustomNextButton = ({
  handleNextButton,
}) => (
  <div
    color="primary"
    className="navButtonContainer"
  >
    <NavigateNextIcon
      className="navbarIcons"
      onClick={handleNextButton}
      size="sm"
    />
  </div>
);

CustomNextButton.propTypes = {
  handleNextButton: PropTypes.func.isRequired,
};

export default (CustomNextButton);