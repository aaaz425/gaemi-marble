import { Icon } from '@components/icon/Icon';
import { styled } from 'styled-components';
import { FIRST_PAGE } from './constants';

type HomeGameRoomsPageProps = {
  currentPage: number;
  totalPage: number;
  handleClickButton: (direction: 'prev' | 'next') => void;
};

export default function HomeGameRoomsPage({
  currentPage,
  totalPage,
  handleClickButton,
}: HomeGameRoomsPageProps) {
  const isFirstPage = currentPage === FIRST_PAGE;
  const isLastPage = currentPage === totalPage;

  return (
    <GameRoomPageContainer>
      <PageButton
        onClick={() => handleClickButton('prev')}
        disabled={isFirstPage}
      >
        <Icon name="arrowLeft" size="5rem" color="accentText" />
      </PageButton>
      <PageNumber>
        {currentPage} / {totalPage}
      </PageNumber>
      <PageButton
        onClick={() => handleClickButton('next')}
        disabled={isLastPage}
      >
        <Icon name="arrowRight" size="5rem" color="accentText" />
      </PageButton>
    </GameRoomPageContainer>
  );
}

const GameRoomPageContainer = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const PageNumber = styled.div`
  padding: 0.5rem;
  border-radius: ${({ theme: { radius } }) => radius.medium};
  background-color: ${({ theme: { color } }) => color.accentPrimary};
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25) inset;
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};
`;

const PageButton = styled.button`
  border-radius: ${({ theme: { radius } }) => radius.medium};
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);

  &:hover&:not(:disabled) {
    background-color: ${({ theme: { color } }) => color.neutralBackground};

    svg path {
      stroke: ${({ theme: { color } }) => color.neutralTextStrong};
    }
  }

  &:disabled {
    opacity: ${({ theme: { opacity } }) => opacity.disabled};
  }
`;
