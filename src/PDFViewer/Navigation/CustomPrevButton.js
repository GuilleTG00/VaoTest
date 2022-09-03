import PropTypes from 'prop-types';
import React from 'react';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const CustomPrevButton = ({
  handlePrevButton,
}) => (
  <div
    color="primary"
    className="navButtonContainer"
  >
    <NavigateBeforeIcon
      className="navbarIcons"
      onClick={handlePrevButton}
      size="sm"
    />
  </div>
);

CustomPrevButton.propTypes = {
  handlePrevButton: PropTypes.func.isRequired,
};

export default (CustomPrevButton);