import { API_STATUS } from '@api/constants';
import { postLogout } from '@api/index';
import { SOUND_PATH } from '@components/constants';
import useHover from '@hooks/useHover';
import useSound from '@hooks/useSound';
import { ROUTE_PATH } from '@router/constants';
import {
  useSetAccessToken,
  useSetPlayer,
  useSetRefreshToken,
} from '@store/index';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Icon } from '../icon/Icon';

export default function HomeHeader() {
  const navigate = useNavigate();
  const { handleMouseEnter, handleMouseLeave, isHover } = useHover();
  const setPlayer = useSetPlayer();
  const setAccessToken = useSetAccessToken();
  const setRefreshToken = useSetRefreshToken();
  const {
    isSoundPlaying,
    togglePlayingSound,
    sound: HomeBgm,
  } = useSound({
    src: SOUND_PATH.HOME_PAGE,
  });

  const handleReload = () => {
    location.reload();
  };

  const handleLogout = async () => {
    const res = await postLogout();
    if (res.status === API_STATUS.SUCCESS) {
      setPlayer('');
      setAccessToken('');
      setRefreshToken('');

      navigate(ROUTE_PATH.SIGN_IN);
    }
  };

  return (
    <>
      <StyledHeader>
        <Logo onClick={handleReload}>
          <h1>Gaemi Marble</h1>
        </Logo>
        <IconWrapper>
          <IconContainer>
            <Icon
              name={isSoundPlaying ? 'soundPlaying' : 'soundMute'}
              size="3rem"
              color="neutralText"
              onClick={togglePlayingSound}
            />
          </IconContainer>
          <IconContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHover ? (
              <Icon name="exit" size="3rem" onClick={handleLogout} />
            ) : (
              <Icon name="sample" size="3rem" />
            )}
          </IconContainer>
        </IconWrapper>
      </StyledHeader>
      {HomeBgm}
    </>
  );
}

const StyledHeader = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.xLarge};
  background-color: ${({ theme: { color } }) => color.accentPrimary};
`;

const Logo = styled.button`
  padding: 0 1rem;
  border-radius: ${({ theme: { radius } }) => radius.medium};
  outline: ${({ theme: { color } }) =>
    `1px solid ${color.neutralBorderStrong}`};
  outline-offset: 3px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  font-family: Galmuri11, sans-serif;
  font-weight: 700;
  color: ${({ theme: { color } }) => color.accentText};
`;

const IconWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  border-radius: ${({ theme: { radius } }) => radius.large};
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme: { color } }) => color.accentSecondary};
`;

const IconContainer = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme: { radius } }) => radius.half};
  background-color: ${({ theme: { color } }) => color.neutralBackground};
  outline: ${({ theme: { color } }) => `1px solid ${color.accentText}`};
  outline-offset: 2px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: { color } }) => color.accentSecondary};

    svg path {
      fill: ${({ theme: { color } }) => color.accentText};
      stroke: ${({ theme: { color } }) => color.accentText};
    }
  }
`;
