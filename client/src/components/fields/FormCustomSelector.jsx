import React from 'react';

import { Controller } from 'react-hook-form';

import CustomSelector from './CustomSelector';

const FormCustomSelector = ({
  name,
  control,
  label,
  width,
  items,
  inputLabelColor,
  selectorIcon,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange } }) => (
      <CustomSelector
        width={width}
        inputLabel={label}
        items={items}
        onChange={onChange}
        inputLabelColor={inputLabelColor}
        selectorIcon={selectorIcon}
      />
    )}
  />
);

export default FormCustomSelector;
