import HomeFooter from '@components/Footer/HomeFooter';
import HomeHeader from '@components/Header/HomeHeader';
import HomeMain from '@components/Home/HomeMain';
import { useSetGame } from '@store/reducer';
import { INITIAL_GAME_STATE } from '@store/reducer/constants';
import { useEffect } from 'react';
import { styled } from 'styled-components';

export default function HomePage() {
  const setGame = useSetGame();

  useEffect(() => {
    setGame(INITIAL_GAME_STATE);
  }, [setGame]);

  return (
    <Home>
      <HomeHeader />
      <HomeMain />
      <HomeFooter />
    </Home>
  );
}

const Home = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
