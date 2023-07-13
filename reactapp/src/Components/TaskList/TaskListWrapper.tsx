import styled from "styled-components";

export const TaskListWrapper = styled.ul`
  width: 100%;
  padding: 0;
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .explanations{
    margin-top: 20px;

    margin-left: 30px;
    margin-right: 30px;

    color: ${props => props.theme.colors.extraText};
    font-size: 15px;
    text-align: center;
    overflow-x: auto;
    word-wrap: break-word;

    @media screen and (max-width: 500px) {
      font-size: 13px;

      margin-left: ${props => props.theme.phone.marginHorizontal};
      margin-right: ${props => props.theme.phone.marginHorizontal};
    }
  }

  .buttonsContainer{
    height: 50px;
    width: 100%;
    margin-top: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;