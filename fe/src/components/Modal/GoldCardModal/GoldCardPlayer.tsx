import { usePlayersValue } from '@store/reducer';
import { styled } from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';

type GoldCardPlayerProps = {
  targetPlayer: string;
  handleChoosePlayer: (target: string) => void;
  handleClickButton: () => void;
};

export default function GoldCardPlayer({
  targetPlayer,
  handleChoosePlayer,
  handleClickButton,
}: GoldCardPlayerProps) {
  const players = usePlayersValue();

  const targetPlayers = players.filter((player) => player.playerId);

  return (
    <>
      <Instruction>타겟 플레이어를 선택하세요</Instruction>
      <PlayerToggleWrapper>
        {targetPlayers.map((player) => (
          <PlayerToggle
            key={player.playerId}
            onClick={() => handleChoosePlayer(player.playerId)}
            $isTarget={player.playerId === targetPlayer}
            $order={player.order}
          >
            {player.playerId}
          </PlayerToggle>
        ))}
      </PlayerToggleWrapper>
      <Target>타겟: {targetPlayer}</Target>
      <AttackButton onClick={handleClickButton}>선택완료</AttackButton>
    </>
  );
}

const Instruction = styled.span``;

const PlayerToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
`;

const PlayerToggle = styled.button<{ $isTarget: boolean; $order: number }>`
  width: 5rem;
  height: 3rem;
  border: ${({ theme, $isTarget }) =>
    $isTarget ? 'none' : `1px solid ${theme.color.neutralBorder}`};
  border-radius: ${({ theme }) => theme.radius.small};
  color: ${({ theme, $isTarget }) =>
    $isTarget ? theme.color.accentText : theme.color.neutralText};
  background-color: ${({ theme, $order, $isTarget }) =>
    $isTarget
      ? theme.color[`player${$order}` as keyof DefaultTheme['color']]
      : 'none'};
`;

const Target = styled.span``;

const AttackButton = styled.button`
  width: 7rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme }) => theme.color.accentText};
  background-color: ${({ theme }) => theme.color.accentBackground};
`;
