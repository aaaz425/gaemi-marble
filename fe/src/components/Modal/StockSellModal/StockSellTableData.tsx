import { cellImageMap } from '@assets/images';
import { useStocksValue } from '@store/reducer';
import { StockType } from '@store/reducer/type';
import { addCommasToNumber } from '@utils/index';
import { styled } from 'styled-components';

type StockSellTableDataProps = {
  stock: Pick<StockType, 'name' | 'quantity'>;
  salesList: { name: string; quantity: number }[];
  handleSalesQuantity: (stock: { name: string; perQuantity: number }) => void;
};

export default function StockSellTableData({
  stock,
  salesList,
  handleSalesQuantity,
}: StockSellTableDataProps) {
  const { name, quantity } = stock;
  const stocks = useStocksValue();

  const saleQuantity = salesList.find((sale) => sale.name === name)!.quantity;
  const { logo, theme, price } = stocks.find((stock) => stock.name === name)!;

  const salePrice = saleQuantity * price;
  const isOverLimit = saleQuantity >= quantity;
  const isUnderLimit = saleQuantity <= 0;

  return (
    <tr key={name}>
      <td>
        <center>
          <StockLogo src={cellImageMap[logo]} />
        </center>
      </td>
      <td>{name}</td>
      <td>{theme}</td>
      <td>{addCommasToNumber(price)}</td>
      <td>{quantity - saleQuantity}</td>
      <td className="sell-quantity">
        <SellQuantityWrapper>
          {saleQuantity}
          <SellButtonWrapper>
            <SellQuantityButton
              disabled={isUnderLimit}
              onClick={() =>
                handleSalesQuantity({
                  name: name,
                  perQuantity: -5,
                })
              }
            >
              -
            </SellQuantityButton>
            <SellQuantityButton
              disabled={isOverLimit}
              onClick={() =>
                handleSalesQuantity({
                  name: name,
                  perQuantity: +5,
                })
              }
            >
              +
            </SellQuantityButton>
          </SellButtonWrapper>
        </SellQuantityWrapper>
      </td>
      <td>{addCommasToNumber(salePrice)}</td>
    </tr>
  );
}

const StockLogo = styled.img`
  width: 2.5rem;
`;

const SellQuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  float: right;
`;

const SellButtonWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const SellQuantityButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ theme: { color } }) => `1px solid ${color.neutralBorder}`};
  border-radius: ${({ theme: { radius } }) => radius.small};

  &:disabled {
    opacity: 0.32;
  }
`;
