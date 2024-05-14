import { getGameRooms } from '@api/index';
import { gameRoomsAtom } from '@store/index';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import HomeButtons from './HomeButtons';
import HomeGameRooms from './HomeGameRooms';
import HomeGameRoomsPage from './HomeGameRoomsPage';
import { FIRST_PAGE, ROOMS_COUNT_PER_PAGE } from './constants';

export default function HomeMain() {
  const [gameRooms, setGameRooms] = useAtom(gameRoomsAtom);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  const handleMovePage = (direction: 'prev' | 'next') => {
    switch (direction) {
      case 'prev':
        setCurrentPage((prev) => prev - 1);
        break;
      case 'next':
        setCurrentPage((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  const fetchGameRooms = useCallback(async () => {
    const res = await getGameRooms();
    const waitingRoomList = res.data;
    setGameRooms(waitingRoomList);
  }, [setGameRooms]);

  useEffect(() => {
    fetchGameRooms();

    const fetchGameRoomsInterval = setInterval(fetchGameRooms, 10000);

    return () => clearInterval(fetchGameRoomsInterval);
  }, [fetchGameRooms]);

  const currentPageRoomsIndex =
    (currentPage - FIRST_PAGE) * ROOMS_COUNT_PER_PAGE;
  const currentPageRooms = gameRooms.slice(
    currentPageRoomsIndex,
    currentPageRoomsIndex + ROOMS_COUNT_PER_PAGE
  );
  const totalPage =
    Math.floor(gameRooms.length / ROOMS_COUNT_PER_PAGE) + FIRST_PAGE;

  return (
    <HomeMainContainer>
      <HomeButtons />
      <HomeGameRooms gameRooms={currentPageRooms} />
      <HomeGameRoomsPage
        currentPage={currentPage}
        totalPage={totalPage}
        handleClickButton={handleMovePage}
      />
    </HomeMainContainer>
  );
}

const HomeMainContainer = styled.div`
  margin: 0 1rem;
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: ${({ theme: { radius } }) => radius.large};
  background-color: ${({ theme: { color } }) => color.accentSecondary};
`;
