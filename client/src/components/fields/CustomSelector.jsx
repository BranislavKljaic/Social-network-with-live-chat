import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
  palette: {
    inputColor: {
      main: '#00b960',
    },
  },
});

const CustomField = (props) => {
  const {
    width,
    inputLabel,
    inputLabelColor,
    items,
    onChange,
    selectorIcon,
    variant,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <FormControl
        sx={{
          width: { width },
        }}
        variant={variant}
      >
        <InputLabel sx={{ color: inputLabelColor }} color="inputColor">
          {inputLabel}
        </InputLabel>
        <Select onChange={onChange} IconComponent={() => selectorIcon || null}>
          {items.map((item) => (
            <MenuItem
              value={item.name}
              key={Math.random()}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default CustomField;
