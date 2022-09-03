/**
 * @author Okorum Technologies
 * @copyright Derechos reservados. Se deberá mantener el crédito al autor dados
 * los derechos de propiedad intelectual que le corresponden.
 *
 * @description Componente que visualiza el navbar del PDF con sus elementos para navegar por el PDF.
 */

 import PropTypes from 'prop-types';
 import React from 'react';
  
 import CustomNextButton from './CustomNextButton.js';
 import CustomPages from './CustomPages.js';
 import CustomPrevButton from './CustomPrevButton.js';
 import CustomZoomIn from './CustomZoomIn.js';
 import CustomZoomOut from './CustomZoomOut.js';
 import './styles.css';

 
 const CustomNavigation = ({
   currentPage, maxScale, minScale, scale, setCurrentPage, setScale, totalPages,
 }) => {
   const handleNextButton = () => {
     if (currentPage < totalPages) {
       setCurrentPage(currentPage + 1);
     }
   };
 
   const handlePrevButton = () => {
     if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
     }
   };
 
   const handleZoomIn = () => {
     setScale(scale + 0.25);
   };
 
   const handleZoomOut = () => {
     setScale(scale - 0.25);
   };
 
   return (
     <div className='containerNavbar'>
       {
         (scale > minScale) && (
           <CustomZoomOut handleZoomOut={handleZoomOut} />
         )
       }
       {
         (currentPage !== 1) && (
           <CustomPrevButton handlePrevButton={handlePrevButton} />
         )
       }
       <CustomPages
         page={currentPage}
         pages={totalPages}
       />
       {
         (currentPage !== totalPages) && (
           <CustomNextButton handleNextButton={handleNextButton} />
         )
       }
       {
         (scale < maxScale) && (
           <CustomZoomIn handleZoomIn={handleZoomIn} />
         )
       }
     </div >
   );
 };
 CustomNavigation.propTypes = {
   currentPage: PropTypes.number.isRequired,
   maxScale: PropTypes.number.isRequired,
   minScale: PropTypes.number.isRequired,
   scale: PropTypes.number.isRequired,
   setCurrentPage: PropTypes.func.isRequired,
   setScale: PropTypes.func.isRequired,
   totalPages: PropTypes.number.isRequired,
 };
 
 export default CustomNavigation;