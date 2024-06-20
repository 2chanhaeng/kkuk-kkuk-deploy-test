import { Button } from '@/components/ui/button';
import { Stamp } from '@/lib/icons';
import { getFooterConditions, getFooterVariant, getFooterContent, getFooterStyles } from './lib';
import { RallyFooterInfo } from './types';

interface RallyFooterProps extends RallyFooterInfo {
  /*
  stampCount: number;
  total: number;
  owned: boolean;
  status: RallyStatus;
  isStampedToday: boolean;
  */
}

export function RallyFooter(props: RallyFooterProps) {
  const content = getFooterContent(props);
  const is = getFooterVariant(getFooterConditions(props));
  const styles = getFooterStyles(is);
  return (
    <footer className={styles.footer}>
      <Button className={styles.shareButton}>친구에게 공유하기</Button>
      <Button disabled={is.disabled} className={styles.stampButton}>
        {(is.stampable || is.reward) && <Stamp className={styles.stampIcon} />}
        {content}
      </Button>
    </footer>
  );
}
