import React from 'react';
import { Button } from '@mui/material';

const CustomButton = (props) => {
  const {
    buttonWidth,
    buttonHeight,
    typeOfButton,
    buttonName,
    variant,
    buttonRadius,
    buttonMarginTop,
    buttonFontSize,
    buttonBackgroundColor,
    buttonColor,
    buttonColorOnHover,
    buttonBackgroundColorOnHover,
    startIcon,
    onClick,
    buttonMarginBottom,
    buttonMarginRight,
    buttonMarginLeft,
  } = props;

  return (
    <Button
      type={typeOfButton}
      variant={variant}
      startIcon={startIcon}
      onClick={onClick}
      sx={{
        textTransform: 'none',
        width: buttonWidth,
        height: buttonHeight,
        borderRadius: buttonRadius,
        marginTop: buttonMarginTop,
        marginBottom: buttonMarginBottom,
        marginRight: buttonMarginRight,
        marginLeft: buttonMarginLeft,
        fontSize: buttonFontSize,
        backgroundColor: buttonBackgroundColor,
        color: buttonColor,
        '&:hover': {
          backgroundColor: buttonBackgroundColorOnHover,
          color: buttonColorOnHover,
        },
      }}
    >
      {buttonName}
    </Button>
  );
};

export default CustomButton;
