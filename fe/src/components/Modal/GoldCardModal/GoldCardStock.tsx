import { useStocksValue } from '@store/reducer';
import { styled } from 'styled-components';

type GoldCardStockProps = {
  targetStock: string;
  handleChooseStock: (target: string) => void;
  handleClickButton: () => void;
};

export default function GoldCardStock({
  targetStock,
  handleChooseStock,
  handleClickButton,
}: GoldCardStockProps) {
  const stocks = useStocksValue();

  return (
    <>
      <Instruction>타겟 주식을 선택하세요</Instruction>
      <StockToggleWrapper>
        {stocks.map((stock) => (
          <StockToggle
            key={stock.name}
            onClick={() => handleChooseStock(stock.name)}
            $isTarget={stock.name === targetStock}
          >
            {stock.name}
          </StockToggle>
        ))}
      </StockToggleWrapper>
      <Target>타겟: {targetStock}</Target>
      <AttackButton onClick={handleClickButton}>선택완료</AttackButton>
    </>
  );
}

const Instruction = styled.span``;

const StockToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StockToggle = styled.button<{ $isTarget: boolean }>`
  width: 7rem;
  height: 3rem;
  border: ${({ theme, $isTarget }) =>
    $isTarget ? 'none' : `1px solid ${theme.color.neutralBorder}`};
  border-radius: ${({ theme }) => theme.radius.small};
  color: ${({ theme, $isTarget }) =>
    $isTarget ? theme.color.accentText : theme.color.neutralText};
  background-color: ${({ theme, $isTarget }) =>
    $isTarget ? theme.color.accentSecondary : 'none'};
`;

const Target = styled.span``;

const AttackButton = styled.button`
  width: 7rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme }) => theme.color.accentText};
  background-color: ${({ theme }) => theme.color.accentBackground};
`;
