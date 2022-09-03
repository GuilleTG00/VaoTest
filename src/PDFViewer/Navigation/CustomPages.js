import PropTypes from 'prop-types';
import React from 'react';

const CustomPages = ({
  page, pages,
}) => (
  <h3 className="pageCountText">
    Page {page} of {pages}
  </h3>
);

CustomPages.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default (CustomPages);