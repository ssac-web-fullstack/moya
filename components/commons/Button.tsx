import React from 'react';

interface Props {
  temp: 'hi';
}

const Button = ({ temp }: Props) => {
  return <div>{temp}</div>;
};

export default Button;
