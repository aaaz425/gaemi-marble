import { styled } from 'styled-components';

type GoldCardNoTargetProps = { handleClickButton: () => void };

export default function GoldCardNoTarget({
  handleClickButton,
}: GoldCardNoTargetProps) {
  return (
    <>
      <Instruction>
        선택하기 버튼을 누른 후 이동할 칸을 선택 및 이동하세요
      </Instruction>
      <AttackButton onClick={handleClickButton}>선택하기</AttackButton>
    </>
  );
}

const Instruction = styled.span``;

const AttackButton = styled.button`
  width: 7rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme }) => theme.color.accentText};
  background-color: ${({ theme }) => theme.color.accentBackground};
`;
