// hooks/useFormField.js
import { useState } from 'react';

export function useFormField(initialValue = '', validate) {
  const [value, setValue]     = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const error = touched && validate ? validate(value) : null;

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    onBlur: () => setTouched(true),
    isInvalid: !!error,
    isValid: touched && !error,
    error,
    reset: () => { setValue(initialValue); setTouched(false); },
  };
}