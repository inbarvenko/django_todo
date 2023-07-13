import React from 'react';
import { TitleNumberWrapper } from './TitleNumberWrapper';


interface Props {
  showText: string;
  showNum: number;
}

const TitleNumber: React.FC<Props> = (props) => {
  return (
    <TitleNumberWrapper>
      <h3 className='titleNumber__title'>{props.showText}</h3>
      <h2 className='titleNumber__number'>{props.showNum}</h2>
    </TitleNumberWrapper>
  );
}

export default TitleNumber;