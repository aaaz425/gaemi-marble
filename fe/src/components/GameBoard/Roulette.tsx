import EventModal from '@components/Modal/EventModal/EventModal';
import { SOUND_PATH } from '@components/constants';
import useSound from '@hooks/useSound';
import {
  useGameInfoValue,
  useResetEventRound,
  useRouletteTimer,
} from '@store/reducer';
import { delay } from '@utils/index';
import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { styled } from 'styled-components';

type RouletteProps = {
  sendStatusBoardMessage: () => void;
};

export default function Roulette({ sendStatusBoardMessage }: RouletteProps) {
  const { eventList, eventResult } = useGameInfoValue();
  const resetGameInfo = useResetEventRound();
  const [mustSpin, setMustSpin] = useState(false);
  const [rouletteTimer, setRouletteTimer] = useRouletteTimer();
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const { sound: RouletteRollingSound } = useSound({
    src: SOUND_PATH.ROULETTE,
  });
  const paddedSeconds = String(rouletteTimer).padStart(2, '0');

  useEffect(() => {
    let isMounted = true;
    const stockSellTimer = async () => {
      await delay(1000);
      if (!isMounted) return;
      if (rouletteTimer === undefined) {
        alert('이벤트 룰렛을 정상적으로 불러오지 못했습니다.');
        return;
      }
      if (rouletteTimer > 0 && !isRolling) {
        setRouletteTimer((prev) => prev - 1);
      }
    };
    stockSellTimer();

    return () => {
      isMounted = false;
    };
  }, [rouletteTimer, setRouletteTimer, isRolling]);

  useEffect(() => {
    if (eventResult === '') return;
    const prizeNumber = eventList.findIndex(
      (event) => event.title === eventResult
    );
    setPrizeNumber(prizeNumber);
    setIsRolling(true);
    setMustSpin(true);
  }, [eventResult, eventList]);

  if (eventList.length === 0) return null;
  const wheelData = eventList.map((event) => {
    return { option: event.title };
  });

  const handleSpinDone = async () => {
    setIsEventModalOpen(true);
    setIsRolling(false);
    sendStatusBoardMessage();
    await delay(5000);
    resetGameInfo();
    setMustSpin(false);
    setIsEventModalOpen(false);
  };

  return (
    <>
      <Container>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelData}
          fontSize={16}
          spinDuration={0.5}
          radiusLineWidth={2}
          outerBorderWidth={2}
          pointerProps={{ style: { width: '70px', height: '70px' } }}
          textColors={['#FCF5ED', '#000']}
          backgroundColors={['#3e3e3e', '#f4acb7']}
          onStopSpinning={handleSpinDone}
        />
        {isEventModalOpen && <EventModal />}
        {isRolling && RouletteRollingSound}
      </Container>
      <Wrapper>
        <Timer $seconds={rouletteTimer}>00:{paddedSeconds}</Timer>
      </Wrapper>
    </>
  );
}

const Container = styled.div`
  transform: rotateX(30deg);
`;

const Wrapper = styled.div`
  position: fixed;
  padding: 0.5rem 1rem;
  top: -6rem;
  display: flex;
  justify-content: center;
  background-color: black;
  border-radius: 10px; // 모서리를 둥글게 만듭니다.
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); // 그림자를 추가합니다.
`;

const Timer = styled.div<{ $seconds: number }>`
  color: ${({ $seconds }) => ($seconds <= 5 ? 'red' : 'limegreen')};
  font-family: 'Digital-7', monospace;
  font-size: ${({ theme }) => theme.fontSize.sMedium};
`;
