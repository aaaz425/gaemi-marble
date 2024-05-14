import { cellImageMap } from '@assets/images';
import useHover from '@hooks/useHover';
import useTooltipPosition from '@hooks/useTooltipPosition';
import { useStocksValue } from '@store/reducer';
import { StockType } from '@store/reducer/type';
import { styled } from 'styled-components';
import PlayerStockTooltip from './PlayerStockTooltip';

type PlayerStockProps = {
  stockInfo: Pick<StockType, 'name' | 'quantity'>;
};

export default function PlayerStock({ stockInfo }: PlayerStockProps) {
  const { positionRef, position, calcPosition } =
    useTooltipPosition<HTMLImageElement>();
  const { handleMouseEnter, handleMouseLeave, isHover } = useHover();
  const stockList = useStocksValue();

  const handleStockImgEnter = (event: React.MouseEvent<HTMLImageElement>) => {
    if (calcPosition) {
      calcPosition(event);
    }

    handleMouseEnter();
  };

  const stockLogo = stockList.find(
    (stock) => stock.name === stockInfo.name
  )!.logo;

  return (
    <>
      <StockImgWrapper>
        <StockImg
          ref={positionRef}
          onMouseEnter={handleStockImgEnter}
          onMouseLeave={handleMouseLeave}
          src={cellImageMap[stockLogo]}
        />
      </StockImgWrapper>
      {isHover && (
        <PlayerStockTooltip stockInfo={stockInfo} position={position} />
      )}
    </>
  );
}

const StockImgWrapper = styled.li`
  min-width: 3rem;
  position: relative;
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ theme }) => theme.color.accentText};

  &:hover {
    cursor: pointer;
  }
`;

const StockImg = styled.img`
  width: 3rem;
  height: 3rem;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius.small};
`;
