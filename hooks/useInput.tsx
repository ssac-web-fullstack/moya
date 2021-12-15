import { ChangeEvent, useState } from 'react';

type useStateType = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

type returnType = [useStateType, () => void];

export const useInput = (initialValue: string): returnType => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  return [{ value, onChange }, () => setValue(initialValue)];
};
