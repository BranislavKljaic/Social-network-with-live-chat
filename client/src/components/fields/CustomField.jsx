/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-undef */
import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    inputColor: {
      main: '#00b960',
    },
  },
});

const CustomField = (props) => {
  const { width, inputLabel, inputLabelColor, typeOfField, onChange } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputTypeOfField, setInputTypeOfField] = useState(typeOfField);

  const changePasswordVisibility = () => {
    if (isPasswordVisible === false) {
      setIsPasswordVisible(true);
      setInputTypeOfField('text');
    } else if (isPasswordVisible === true) {
      setIsPasswordVisible(false);
      setInputTypeOfField('password');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl
        sx={{
          width: { width },
        }}
        variant="outlined"
      >
        {inputLabel !== 'Date of birth' ? (
          <InputLabel sx={{ color: inputLabelColor }} color="inputColor">
            {inputLabel}
          </InputLabel>
        ) : (
          <></>
        )}

        <Input
          type={inputTypeOfField}
          onChange={onChange}
          color="inputColor"
          sx={{
            '::before': {
              borderBottom: 'solid 1px #fff',
            },
            input: {
              color: inputLabelColor,
              borderBottom: 'solid 1px #fff',
            },
          }}
          required
          endAdornment={
            typeOfField === 'password' ? (
              <InputAdornment position="end">
                <IconButton onClick={changePasswordVisibility}>
                  {isPasswordVisible ? (
                    <VisibilityOffOutlinedIcon style={{ color: 'red' }} />
                  ) : (
                    <VisibilityOutlinedIcon style={{ color: 'white' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ) : (
              <></>
            )
          }
        />
      </FormControl>
    </ThemeProvider>
  );
};

export default CustomField;
