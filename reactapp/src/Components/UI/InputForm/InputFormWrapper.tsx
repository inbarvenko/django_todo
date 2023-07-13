import styled from 'styled-components';
import { css } from 'styled-components';
import { AvailableButtonTypes } from '../../../types';

export const InputFormWrapper = styled.form<{buttonType: AvailableButtonTypes}>`
  display: flex;
  align-items: center;
  justify-content:space-evenly;
  flex: 1 auto;

  .inputForm{
    font-family:'Montserrat', sans-serif;
    font-size: 16px;
    flex-grow: 1;
    
    height: 20px;
    word-wrap: break-word;

    ${props => (props.buttonType === 'edit') && css`
      background-color: ${props => props.theme.colors.input};
      text-align: center;
    `}

    @media screen and (max-width: 400px) {
      margin-left: ${props => props.theme.phone.marginHorizontal};
    }
  }
`;