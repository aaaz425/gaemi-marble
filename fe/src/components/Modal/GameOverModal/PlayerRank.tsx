import { useGameInfoValue } from '@store/reducer';
import { PlayerRankingType } from '@store/reducer/type';
import { addCommasToNumber } from '@utils/index';
import { styled } from 'styled-components';

type PlayerRankProps = {
  rankInfo: PlayerRankingType;
};

export default function PlayerRank({ rankInfo }: PlayerRankProps) {
  const { ranking } = useGameInfoValue();
  const { playerId, totalAsset } = rankInfo;

  const sortedRank = ranking.sort(
    (playerA, playerB) => playerB.totalAsset - playerA.totalAsset
  );
  const currentRankIndex = sortedRank.findIndex(
    (rank) => rank.playerId === playerId
  );
  const finalRank = currentRankIndex + 1;

  return (
    <PlayerRankCard>
      <Rank>{finalRank}</Rank>
      <Wrapper>
        <Name>{playerId}</Name>
        <div>{addCommasToNumber(totalAsset)}원</div>
      </Wrapper>
    </PlayerRankCard>
  );
}

const PlayerRankCard = styled.li`
  height: 6rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.small};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const Rank = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid;
  border-radius: 50%;
  text-align: center;
`;

const Name = styled.div``;
