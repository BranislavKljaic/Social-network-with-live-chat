import React from 'react';

import CardMedia from '@mui/material/CardMedia';

const AvatarImage = (props) => {
  const {
    imgHeight,
    imgWidth,
    imgBorderRadius,
    image,
    onClick,
    imgMarginLeft,
    imgMarginRight,
    imgMarginTop,
    imgMarginBottom,
  } = props;

  return (
    <CardMedia
      component="img"
      sx={{
        height: imgHeight,
        width: imgWidth,
        borderRadius: imgBorderRadius,
        marginTop: imgMarginTop,
        marginBottom: imgMarginBottom,
        marginLeft: imgMarginLeft,
        marginRight: imgMarginRight,
      }}
      image={image}
      onClick={onClick}
    />
  );
};

export default AvatarImage;
