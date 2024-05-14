import useOutsideClick from '@hooks/useOutsideClick';
import Modal from '../Modal';
import EnterModalContent from './EnterModalContent';

type EnterModalProps = {
  handleClose: () => void;
};

export default function EnterModal({ handleClose }: EnterModalProps) {
  const { ref: enterModalRef } = useOutsideClick<HTMLDivElement>(handleClose);

  return (
    <Modal
      ref={enterModalRef}
      header="방 번호를 입력하세요"
      content={<EnterModalContent />}
    />
  );
}
