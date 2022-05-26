import React from 'react';

import { Controller } from 'react-hook-form';

import CustomField from './CustomField';

const FormCustomField = ({
  name,
  control,
  label,
  width,
  typeOfField,
  inputLabelColor,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <CustomField
        width={width}
        inputLabel={label}
        typeOfField={typeOfField}
        inputValue={value}
        onChange={onChange}
        inputLabelColor={inputLabelColor}
      />
    )}
  />
);

export default FormCustomField;
