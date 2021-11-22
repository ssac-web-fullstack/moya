import React, { useState } from 'react';

interface Props {
  initialValue: string;
}

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (evt) => {
    console.log(evt.target);
  };

  return { value, onChange };
};

export default useInput;

// 참고 https://velog.io/@tiahwang/%EA%B0%95%EC%9D%98%EB%85%B8%ED%8A%B8-Hooks-useInput
