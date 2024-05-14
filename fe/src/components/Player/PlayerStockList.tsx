import { Icon } from '@components/icon/Icon';
import useClickScrollButton from '@hooks/useClickScrollButton';
import { StockType } from '@store/reducer/type';
import { styled } from 'styled-components';
import PlayerStock from './PlayerStock';
import { SCROLL_ONCE } from './constants';

type PlayerStockListProps = {
  stockList: Pick<StockType, 'name' | 'quantity'>[];
};

export default function PlayerStockList({ stockList }: PlayerStockListProps) {
  const { ref, handleClickScroll } = useClickScrollButton<HTMLUListElement>({
    width: SCROLL_ONCE,
  });

  return (
    <>
      <StockWrapper>
        <ArrowButton onClick={() => handleClickScroll()}>
          <Icon name="arrowLeft" color="accentText" />
        </ArrowButton>
        <PlayerStocks ref={ref}>
          {stockList.map((stock) => (
            <PlayerStock key={stock.name} stockInfo={stock} />
          ))}
        </PlayerStocks>
        <ArrowButton onClick={() => handleClickScroll(true)}>
          <Icon name="arrowRight" color="accentText" />
        </ArrowButton>
      </StockWrapper>
    </>
  );
}

const StockWrapper = styled.div`
  width: 22rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  border-radius: ${({ theme: { radius } }) => radius.small};
  background-color: ${({ theme: { color } }) => color.neutralBackground};
`;

const PlayerStocks = styled.ul`
  flex: 1;
  display: flex;
  gap: 0.5rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArrowButton = styled.button`
  width: 1rem;
  height: 3rem;
  border-radius: ${({ theme: { radius } }) => radius.small};
  background-color: ${({ theme: { color } }) => color.neutralBackgroundBold};
`;
