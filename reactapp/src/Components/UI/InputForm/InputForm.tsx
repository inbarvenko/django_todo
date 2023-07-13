import React, { useState } from 'react';
import Button from '../Button/Button';
import { AvailableButtonTypes } from '../../../types';
import { InputFormWrapper } from './InputFormWrapper';

interface Props {
  taskTitle: string;
  onClickSave: (title: string) => void;
  isButtonDisabled?: boolean;
  buttonName?: string;
  buttonType?: AvailableButtonTypes;
}

const InputForm: React.FC<Props> = (props) => {
  const {
    buttonName = '',
    buttonType = 'delete',
  } = props;

  const [title, setTitle] = useState(props.taskTitle);

  const saveTaskTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClickSave(title);
    setTitle('');
  };

  const enterSaveTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onClickSave(title);
    setTitle('');
  }

  const changingTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const returnValue = () => {
    props.onClickSave('');
  } 

  return (
    <InputFormWrapper
      buttonType={buttonType}
      onSubmit={enterSaveTask}
    >
      <input
        className='inputForm'
        autoFocus={true}
        type="text"
        value={title}
        onChange={changingTitle}
        onBlur={returnValue}

      ></input>
      <Button
        isButtonDisabled={props.isButtonDisabled}
        onClick={saveTaskTitle}
        title={buttonName}
      />
    </InputFormWrapper>
  )
}

export default InputForm;