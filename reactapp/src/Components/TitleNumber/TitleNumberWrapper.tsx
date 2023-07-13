import styled from "styled-components";

export const TitleNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding-bottom: 30px;
  padding-top: 30px;

  .titleNumber__number{
    padding-left: 20px;
    color: ${props => props.theme.colors.title__number};
  }

  .titleNumber__title{
    text-align: center;
    font-size: 20px;
  }

  @media screen and (max-width: 400px) {
    margin-left: ${props => props.theme.phone.marginHorizontal};
    margin-right: ${props => props.theme.phone.marginHorizontal};
  }
`;