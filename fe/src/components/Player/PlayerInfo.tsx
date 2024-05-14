import { Icon } from '@components/icon/Icon';
import { ANT_LIST } from '@pages/constants';
import { useGameInfoValue, useResetPlayerEmote } from '@store/reducer';
import { PlayerType } from '@store/reducer/type';
import { addCommasToNumber } from '@utils/index';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import EmoteBubble from './EmoteBubble';
import { EMOTE_DISPLAY_TIME } from './constants';

type PlayerInfoProps = {
  player: PlayerType;
};

export default function PlayerInfo({ player }: PlayerInfoProps) {
  const antName = ANT_LIST.find((ant) => ant.order === player?.order)!.antName;
  const { currentPlayerId } = useGameInfoValue();
  const resetPlayerEmote = useResetPlayerEmote();
  const { position, userStatusBoard, playerId, emote } = player;
  const { isActive: isEmoteActive, name: emoteName } = emote;
  const { cashAsset, stockAsset, totalAsset } = userStatusBoard;
  const isCurrentPlayer = currentPlayerId === playerId;

  useEffect(() => {
    if (!isEmoteActive || !emoteName) return;
    setTimeout(() => {
      resetPlayerEmote(playerId);
    }, EMOTE_DISPLAY_TIME);
  }, [isEmoteActive, emoteName, playerId, resetPlayerEmote]);

  return (
    <UserInfo $isCurrentPlayer={isCurrentPlayer}>
      <IconContainer>
        <Icon name={antName} size="8rem" />
        {isEmoteActive && emoteName && (
          <EmoteBubble emoteName={emoteName} position={position} />
        )}
      </IconContainer>
      <PlayerInfoContainer>
        <PlayerId>{playerId}</PlayerId>
        <PlayerProperty>
          <PropertyText>
            보유 현금: {addCommasToNumber(cashAsset)}원
          </PropertyText>
          <PropertyText>
            주식 가치: {addCommasToNumber(stockAsset)}원
          </PropertyText>
          <PropertyText>
            총 자산:
            {addCommasToNumber(totalAsset)}원
          </PropertyText>
        </PlayerProperty>
      </PlayerInfoContainer>
    </UserInfo>
  );
}

const UserInfo = styled.div<{ $isCurrentPlayer: boolean }>`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border: ${({ $isCurrentPlayer, theme: { color } }) =>
    $isCurrentPlayer ? `4px solid ${color.accentTertiary}` : 'none'};
  border-radius: ${({ theme: { radius } }) => radius.small};
  color: ${({ theme: { color } }) => color.neutralText};
  background-color: ${({ theme: { color } }) => color.neutralBackground};
  box-shadow: ${(props) =>
    props.$isCurrentPlayer
      ? `0 0 5px ${props.theme.color.accentTertiary}, 0 0 10px ${props.theme.color.accentTertiary}`
      : 'none'};
`;

const IconContainer = styled.div`
  width: 8rem;
  height: 10rem;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${({ theme: { radius } }) => radius.small};
  background-color: ${({ theme: { color } }) => color.systemBackground};
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlayerId = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.sMedium};
`;

const PlayerProperty = styled.div`
  width: 12.5rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0 0.5rem 0.2rem;
  border-radius: ${({ theme: { radius } }) => radius.small};
  font-size: ${({ theme: { fontSize } }) => fontSize.xSmall};
  color: ${({ theme: { color } }) => color.neutralText};
  background-color: ${({ theme: { color } }) => color.neutralBackgroundBold};
`;

const PropertyText = styled.span`
  display: block;
`;
