import React from 'react';

interface Props {
  temp: 'hi';
}

const Header = ({ temp }: Props) => {
  return <div>{temp}</div>;
};

export default Header;
