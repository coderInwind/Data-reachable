import styled from "styled-components";

export const TaskWrapper = styled.div`
  width: 700px;
  min-height: 400px;
  display: flex;
  line-height: 50px;
  margin-left: 50%;
  margin-top: 450px;
  transform: translateX(-50%) translateY(-50%);
  justify-content: space-between;

  .study,
  .learning,
  .complete {
    width: 200px;
  }

  .study {
    min-height: 400px;
    background-color: #f5e0e1;
    &::before {
      content: "Prepare to study";
      background-color: #f5e0e1;
      display: block;
      margin-top: -50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }

    input {
      width: 150px;
      height: 30px;
      display: block;
      margin-left: 20px;
    }

    .blank {
      width: 200px;
      height: 30px;
    }

    .add {
      width: 40px;
      height: 40px;
      margin: 30px auto;
      text-align: center;
      line-height: 35px;
      font-size: 40px;
      border: 2px solid #c49b9b;
      border-radius: 50%;

      & {
        cursor: pointer;
      }
    }
  }

  .learning {
    background-color: #a3d09b;
    input {
      width: 150px;
      height: 30px;
      display: block;
      margin: 30px 20px;
    }

    &::before {
      content: "Learning";
      background-color: #a3d09b;
      display: block;
      margin-top: -50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }

  .complete {
    background-color: #e2e2e2;

    input {
      width: 150px;
      height: 30px;
      display: block;
      margin: 30px 20px;
    }

    &::before {
      content: "Complete";
      background-color: #e2e2e2;
      display: block;
      margin-top: -50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
`;
