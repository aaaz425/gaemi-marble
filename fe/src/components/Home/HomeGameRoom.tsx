import { ROUTE_PATH } from '@router/constants';
import { RoomInfo } from '@store/type';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FULL_PLAYER_COUNT } from './constants';

type HomeGameRoomProps = { room: RoomInfo };

export default function HomeGameRoom({ room }: HomeGameRoomProps) {
  const navigate = useNavigate();
  const { gameId, isPlaying, playerCount } = room;

  const handleClickRoom = () => {
    if (isPlaying) {
      alert('게임이 이미 진행중입니다.');
      return;
    }

    navigate(`${ROUTE_PATH.GAME}/${gameId}`);
  };

  return (
    <GameRoom onClick={handleClickRoom}>
      <GameId>{gameId}번 방</GameId>
      <GameInfo>
        <GameStatus>{isPlaying ? '게임 중' : '대기 중'}</GameStatus>
        <GamePlayerCount>
          {playerCount}/{FULL_PLAYER_COUNT}
        </GamePlayerCount>
      </GameInfo>
    </GameRoom>
  );
}

const GameRoom = styled.li`
  width: 49%;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: ${({ theme: { radius } }) => radius.medium};
  background-color: ${({ theme: { color } }) => color.accentSecondary};
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};

  &:hover {
    cursor: pointer;
    opacity: ${({ theme: { opacity } }) => opacity.hover};
    background-color: ${({ theme: { color } }) => color.neutralBackground};
  }
`;

const GameId = styled.div`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme: { radius } }) => radius.medium};
  background-color: ${({ theme: { color } }) => color.accentPrimary};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25) inset;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameStatus = styled.div`
  font-size: ${({ theme: { fontSize } }) => fontSize.sMedium};
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
`;

const GamePlayerCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme: { fontSize } }) => fontSize.sMedium};
  border-radius: ${({ theme: { radius } }) => radius.medium};
  background-color: ${({ theme: { color } }) => color.accentPrimary};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25) inset;
`;
