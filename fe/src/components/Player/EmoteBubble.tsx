import { Icon } from '@components/icon/Icon';
import { EmoteNameType } from '@store/reducer/type';
import { styled } from 'styled-components';

type BubblePositionType = 'top' | 'bottom';

type EmoteBubbleProps = {
  emoteName: EmoteNameType;
  position: BubblePositionType;
};

export default function EmoteBubble({ emoteName, position }: EmoteBubbleProps) {
  return (
    <Bubble $position={position}>
      <Icon name={emoteName} size="3rem" />
    </Bubble>
  );
}

const Bubble = styled.div<{ $position: BubblePositionType }>`
  width: 4rem;
  height: 4rem;
  position: absolute;
  ${({ $position }) => ($position === 'top' ? 'bottom: -3rem' : 'top: -3rem')};
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.color.accentBeige};
  z-index: 100;

  &:after {
    content: '';
    position: absolute;
    ${({ $position }) => ($position === 'top' ? 'top: 0' : 'bottom: 0')};
    left: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    ${({ $position, theme }) =>
      $position === 'top'
        ? `border-bottom-color: ${theme.color.accentBeige}`
        : `border-top-color: ${theme.color.accentBeige}`};
    ${({ $position }) =>
      $position === 'top' ? 'border-top: 0' : 'border-bottom: 0'};
    border-left: 0;
    margin-left: -15px;
    ${({ $position }) =>
      $position === 'top' ? 'margin-top: -15px' : 'margin-bottom: -15px'};
  }
`;
