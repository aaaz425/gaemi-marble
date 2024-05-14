import { SOUND_PATH } from '@components/constants';
import useMoveToken from '@hooks/useMoveToken';
import useSound from '@hooks/useSound';
import { usePlayerIdValue } from '@store/index';
import { useGameInfoValue, usePlayersValue } from '@store/reducer';
import { useEffect, useRef, useState } from 'react';
import ReactDice, { ReactDiceRef } from 'react-dice-complete';
import { styled } from 'styled-components';

type DiceProps = {
  sendCellMessage: (playerId: string) => void;
};

export default function Dice({ sendCellMessage }: DiceProps) {
  const reactDice = useRef<ReactDiceRef>(null);
  const players = usePlayersValue();
  const playerId = usePlayerIdValue();
  const { currentPlayerId, dice } = useGameInfoValue();
  const [dice1, dice2] = dice;
  const moveToken = useMoveToken();
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const { sound: DiceRollSound } = useSound({
    src: SOUND_PATH.DICE,
  });

  const isMyTurn = currentPlayerId === playerId;

  useEffect(() => {
    if (dice1 === 0 || dice2 === 0) return;
    rollDice(dice1, dice2);
  }, [dice1, dice2]);

  const rollDice = (dice1: number, dice2: number) => {
    reactDice.current?.rollAll([dice1, dice2]);
    setIsRolling(true);
  };

  const rollDone = async () => {
    if (dice1 === 0 || dice2 === 0) return;

    const totalDiceValue = dice1 + dice2;
    setDiceValue(totalDiceValue);
    const targetPlayer = players.find(
      (player) => player.playerId === currentPlayerId
    );
    setIsRolling(false);

    if (targetPlayer?.gameBoard.hasEscaped) {
      await moveToken({
        diceCount: totalDiceValue,
        playerGameBoardData: targetPlayer.gameBoard,
      });
    }

    if (isMyTurn) {
      sendCellMessage(playerId);
    }
  };

  return (
    <>
      <ReactDice
        numDice={2}
        ref={reactDice}
        rollDone={rollDone}
        rollTime={1}
        faceColor="#fff"
        dotColor="#000"
        disableIndividual={true}
      />
      <DiceValue>{diceValue}</DiceValue>
      {isRolling && DiceRollSound}
    </>
  );
}

const DiceValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.medium};
`;
