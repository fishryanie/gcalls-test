import React from 'react'


export default function InputComponent(props) {
  const {id, type, label, field, error, touched, onBlur, onChange, value} = props
  return (
    <FormControl fullWidth error={Boolean(touched && error)} 
      sx={{ ...theme.typography.customInput, mb:2, mt:2, maxWidth: '100%' }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        value={value}
        name={field}
        onBlur={onBlur}
        onChange={onChange}
        label={label}
        inputProps={{}}
      />
      {touched && error && (
        <FormHelperText error id="standard-weight-helper-text-email-login">
          {error}
        </FormHelperText>
      )}
    </FormControl>
    )
}

