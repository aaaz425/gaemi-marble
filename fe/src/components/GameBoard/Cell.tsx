import { cellImageMap } from '@assets/images';
import { PlayerStatusType } from '@store/reducer/type';
import { addCommasToNumber } from '@utils/index';
import { styled } from 'styled-components';
import { PRISON_CELL } from './constants';

type CellType = {
  theme?: string;
  name: string;
  logo: string;
  location: number;
};

type CellProps = {
  cell: CellType;
  price?: number;
  playerStatus: PlayerStatusType;
  targetLocation: number | null;
  selectTargetLocation: (location: number) => void;
};

export default function Cell({
  cell,
  price,
  playerStatus,
  targetLocation,
  selectTargetLocation,
}: CellProps) {
  const { logo, name, location, theme } = cell;
  const lineNum = Math.floor(location / 6) + 1;

  const handleClickCell = () => {
    if (playerStatus !== 'teleport') return;
    if (location === 18) {
      alert('이동할 수 없는 위치입니다.');
      return;
    }
    selectTargetLocation(location);
    return;
  };

  const isSelected = targetLocation === location;
  const isPrison = location === PRISON_CELL;

  return (
    <Box>
      <FrontFace
        $status={playerStatus}
        $isSelected={isSelected}
        $isPrison={isPrison}
        $lineNum={lineNum}
        onClick={handleClickCell}
      >
        {theme && (
          <Header>
            <Name>{name}</Name>
          </Header>
        )}
        <Content>
          {theme && <Logo src={cellImageMap[logo]} />}
          {!theme && <CellImg src={cellImageMap[logo]} />}
          {price && <span>{addCommasToNumber(price)}</span>}
        </Content>
      </FrontFace>
      <BackFace />
      <RightFace />
      <LeftFace />
      <TopFace />
      <BottomFace />
    </Box>
  );
}

const Box = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-1rem);
`;

const FrontFace = styled.div<{
  $status: PlayerStatusType;
  $isSelected: boolean;
  $isPrison: boolean;
  $lineNum: number;
}>`
  width: 6rem;
  height: 6rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBackgroundBold}`};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.accentTertiary : theme.color.accentText};
  transform: rotateY(0deg) translateZ(1rem)
    ${({ $lineNum }) =>
      $lineNum === 1 || $lineNum === 3 ? 'rotateZ(90deg)' : ''};
  cursor: ${({ $status }) => ($status === 'teleport' ? 'pointer' : 'default')};
`;

const Header = styled.div`
  min-height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 2rem;
  height: 2rem;
`;

const CellImg = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Name = styled.div`
  color: ${({ theme: { color } }) => color.neutralText};
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: ${({ theme: { color } }) => color.neutralText};
`;

const BackFace = styled.div`
  width: 6rem;
  height: 6rem;
  position: absolute;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBackgroundBold}`};
  background-color: ${({ theme: { color } }) => color.accentText};
  transform: rotateY(180deg) translateZ(1rem);
`;

const RightFace = styled.div`
  width: 2rem;
  height: 6rem;
  position: absolute;
  right: 0;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBackgroundBold}`};
  background-color: ${({ theme: { color } }) => color.accentText};
  transform: rotateY(90deg) translateZ(1rem);
`;

const LeftFace = styled.div`
  width: 2rem;
  height: 6rem;
  position: absolute;
  left: 0;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBackgroundBold}`};
  background-color: ${({ theme: { color } }) => color.accentText};
  transform: rotateY(-90deg) translateZ(1rem);
`;

const TopFace = styled.div`
  width: 6rem;
  height: 2rem;
  position: absolute;
  top: 2rem;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBackgroundBold}`};
  background-color: ${({ theme: { color } }) => color.accentText};
  transform: rotateX(90deg) translateZ(3rem);
`;

const BottomFace = styled.div`
  width: 6rem;
  height: 2rem;
  position: absolute;
  top: 2rem;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBackgroundBold}`};
  background-color: ${({ theme: { color } }) => color.accentText};
  transform: rotateX(-90deg) translateZ(3rem);
`;
