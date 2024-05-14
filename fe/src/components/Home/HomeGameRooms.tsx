import { RoomInfo } from '@store/type';
import { styled } from 'styled-components';
import HomeGameRoom from './HomeGameRoom';

type HomeGameRoomsProps = {
  gameRooms: RoomInfo[];
};

export default function HomeGameRooms({ gameRooms }: HomeGameRoomsProps) {
  return (
    <GameRoomsContainer>
      <GameRooms>
        {gameRooms.map((room) => (
          <HomeGameRoom key={room.gameId} room={room} />
        ))}
      </GameRooms>
    </GameRoomsContainer>
  );
}

const GameRoomsContainer = styled.div`
  margin: 1rem;
  padding: 1rem 1rem 0.5rem;
  flex: 1;
  border-radius: ${({ theme: { radius } }) => radius.medium};
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme: { color } }) => color.accentPrimary};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1.5rem;
    &-thumb {
      background-color: ${({ theme: { color } }) => color.accentSecondary};
      border: 0.3rem solid ${({ theme: { color } }) => color.accentPrimary};
      border-radius: ${({ theme: { radius } }) => radius.medium};

      &:hover {
        background-color: ${({ theme: { color } }) =>
          color.neutralBorderStrong};
      }
    }
  }
`;

const GameRooms = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
