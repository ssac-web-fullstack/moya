import React, { useState } from 'react';

export const useInput = (initialValue: string): any => {
  const [value, setValue] = useState<string>(initialValue);
  const changeForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  return [{ value, onChange: changeForm }, () => setValue(initialValue)];
};
