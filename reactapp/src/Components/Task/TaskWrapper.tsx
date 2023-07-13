import styled, {css} from "styled-components";

export const TaskWrapper = styled.li<{isDone: boolean}>`
  width: 100%;
    
  padding-bottom: 15px;
  padding-top: 15px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content:center;
  overflow: hidden;

  flex: 1 auto;

  .input {
    margin-left: 15px;
    margin-right: 15px;

    min-width: 20px;
    min-height: 20px;
    cursor: pointer;

    box-shadow: 0 3px 3px rgba(0,0,0,0.15);

    @media screen and (max-width: 400px) {
      min-width: 15px;
      min-height: 15px;
    }
  }

  .text {
    text-align: center;
    flex-grow: 1;
    overflow-x: auto;
    word-wrap: break-word;

    ${props => props.isDone && css`
      color: ${props => props.theme.colors.extraText};
      text-decoration: line-through;
    `}
  }
`;