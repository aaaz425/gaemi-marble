import Modal from '../Modal';
import GameOverModalContent from './GameOverModalContent';

export default function GameOverModal() {
  return <Modal header="게임 종료" content={<GameOverModalContent />} />;
}
