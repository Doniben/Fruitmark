import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 3px;
  border-color: solid 2px rgba(0,164,109,1);
  padding: 10px;
  margin: 5px;
  justify-content: center;
  background: rgba(0,164,109,0.1);
  ${(props) =>
    props.primary &&
    css`
      background: rgba(0,164,109,1);
    `}
  ${(props) =>
    props.secondary &&
    css`
      background: rgba(0,164,109,1);
    `}
    ${(props) =>
    props.danger &&
    css`
      background: #f40105;
    `}
    ${(props) =>
    props.large &&
    css`
      width: 135px;
    `}
    ${(props) =>
    props.medium &&
    css`
      width: 100px;
    `}
    ${(props) =>
    props.small &&
    css`
      width: 40px;
    `}
`;

export default EasyButton;
