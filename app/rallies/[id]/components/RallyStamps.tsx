import { RallyStamp, StampStatus, StampKind } from '@/components/RallyStamp';
import { RallyPreviewStamp } from '@/types/Stamp';
import { rallyStampsStyles } from './styles';
import { RallyStampsInfo } from './types';

interface RallyStampsProps extends RallyStampsInfo {
  stamps: RallyPreviewStamp[];
}

export default function RallyStamps({ stamps, total, stampCount, owned }: RallyStampsProps) {
  return (
    <article className={rallyStampsStyles.container}>
      <h2 className={rallyStampsStyles.title}>스탬프 랠리</h2>
      <section className={rallyStampsStyles.stamps}>
        {stamps
          .map((e, i) => ({
            ...e,
            order: i,
            status: i < stampCount ? StampStatus.checked : i === stampCount ? StampStatus.checkable : StampStatus.uncheckable,
            kind: i === total - 1 ? StampKind.reward : StampKind.default,
            owned,
          }))
          .map(({ id, image, status, kind, owned, order }) => (
            <RallyStamp key={id} id={id} image={image} status={status} kind={kind} owned={owned} order={order} />
          ))}
      </section>
    </article>
  );
}
