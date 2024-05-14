import { useGameInfoValue } from '@store/reducer';
import Modal from '../Modal';
import EventModalContent from './EventModalContent';

export default function EventModal() {
  const { eventList, eventResult } = useGameInfoValue();
  const targetEvent = eventList.find((event) => event.title === eventResult);

  return (
    targetEvent && (
      <Modal
        header={targetEvent.title}
        content={<EventModalContent eventInfo={targetEvent} />}
      />
    )
  );
}
