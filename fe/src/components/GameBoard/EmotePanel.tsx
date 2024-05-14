import { Icon } from '@components/icon/Icon';
import useGetSocketUrl from '@hooks/useGetSocketUrl';
import { usePlayerIdValue } from '@store/index';
import { EmoteNameType } from '@store/reducer/type';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { styled } from 'styled-components';
import { EMOTE_DEBOUNCE_DELAY, EMOTE_LIST } from './constants';

type EmotePanelProps = {
  isActive: boolean;
};

export default function EmotePanel({ isActive }: EmotePanelProps) {
  const { gameId } = useParams();
  const playerId = usePlayerIdValue();
  const socketUrl = useGetSocketUrl();
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    share: true,
  });
  const [canSendEmote, setCanSendEmote] = useState(true);

  const debounceSendEmote = (name: EmoteNameType) => {
    if (canSendEmote) {
      const message = {
        gameId,
        playerId,
        name,
        type: 'emoticon',
      };
      sendJsonMessage(message);
      setCanSendEmote(false);
      setTimeout(() => {
        setCanSendEmote(true);
      }, EMOTE_DEBOUNCE_DELAY);
    }
  };

  return (
    <Panel $isActive={isActive}>
      {EMOTE_LIST.map((emote) => (
        <Icon
          key={emote}
          name={emote}
          size="4rem"
          onClick={() => debounceSendEmote(emote)}
        />
      ))}
    </Panel>
  );
}

const Panel = styled.div<{ $isActive: boolean }>`
  width: 200px;
  position: absolute;
  top: 40%;
  right: 60px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ theme }) => theme.color.neutralBackground};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
`;
