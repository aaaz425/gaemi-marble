import { ROUTE_PATH } from '@router/constants';
import { useGameInfoValue } from '@store/reducer';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import PlayerRank from './PlayerRank';

export default function GameOverModalContent() {
  const navigate = useNavigate();
  const { ranking } = useGameInfoValue();

  const handleExit = () => {
    navigate(ROUTE_PATH.HOME);
  };

  return (
    <>
      <span>최종 자산 순위</span>
      {ranking.length !== 0 ? (
        <PlayerRankList>
          {ranking.map((playerRank, index) => (
            <PlayerRank key={index} rankInfo={playerRank} />
          ))}
        </PlayerRankList>
      ) : (
        <div>순위를 불러오는 중입니다...</div>
      )}
      <button onClick={handleExit}>나가기</button>
    </>
  );
}

const PlayerRankList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
