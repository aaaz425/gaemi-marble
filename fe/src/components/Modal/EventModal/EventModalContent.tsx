import { RouletteEvent } from '@store/reducer/type';

type EventModalContentProps = {
  eventInfo: RouletteEvent;
};

export default function EventModalContent({
  eventInfo,
}: EventModalContentProps) {
  const { content, impact } = eventInfo;

  return (
    <>
      <div>{content}</div>
      <div>{impact}</div>
    </>
  );
}
