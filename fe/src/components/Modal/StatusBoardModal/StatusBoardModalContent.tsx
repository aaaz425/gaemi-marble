import { cellImageMap } from '@assets/images';
import { useStocksValue } from '@store/reducer';
import { addCommasToNumber } from '@utils/index';
import { styled } from 'styled-components';

export default function StatusBoardModalContent() {
  const stocks = useStocksValue();

  return (
    <Stocks>
      <thead>
        <tr>
          <th>로고</th>
          <th>이름</th>
          <th>테마</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          const { name, logo, theme, price, quantity } = stock;

          return (
            <tr key={name}>
              <td>
                <Logo src={cellImageMap[logo]} />
              </td>
              <td>{name}</td>
              <td>{theme}</td>
              <td>{addCommasToNumber(price)}</td>
              <td>{quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </Stocks>
  );
}

const Stocks = styled.table`
  border: 1px solid ${({ theme }) => theme.color.neutralBorderStrong};

  thead {
    border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorderStrong};
    height: 3rem;

    th {
      color: ${({ theme }) => theme.color.accentText};
      background-color: ${({ theme }) => theme.color.accentSecondary};
    }
  }

  th,
  td {
    padding: 0.3rem 1.5rem;
    border: 1px solid ${({ theme }) => theme.color.neutralBorderStrong};
  }
`;

const Logo = styled.img`
  width: 1.5rem;
`;
