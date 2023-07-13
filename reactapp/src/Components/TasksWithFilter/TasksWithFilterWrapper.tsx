import styled from 'styled-components';

export const TasksWithFilterWrapper = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-evenly;
  
    padding-bottom: 30px;

    .filter {
      padding-top: 20px;
      width: 100%;

      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    .filter__title {
      text-align: center;
      padding-right: 5px;

      @media screen and (max-width: 400px) {
        font-size: 15px;
      }
    }
`;