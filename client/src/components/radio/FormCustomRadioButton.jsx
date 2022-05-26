import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { socialNetworkRoles } from '../../shared/Helpers';

const theme = createTheme({
  palette: {
    inputColor: {
      main: '#00b960',
    },
  },
});

const FormCustomRadioButton = ({ name, control }) => (
  <ThemeProvider theme={theme}>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <RadioGroup onChange={onChange} row>
          {socialNetworkRoles.map((role) => (
            <FormControlLabel
              key={role.value}
              value={role.value}
              label={role.name}
              sx={{ color: 'white' }}
              control={<Radio color="inputColor" sx={{ color: 'white' }} />}
            />
          ))}
        </RadioGroup>
      )}
    />
  </ThemeProvider>
);

export default FormCustomRadioButton;
