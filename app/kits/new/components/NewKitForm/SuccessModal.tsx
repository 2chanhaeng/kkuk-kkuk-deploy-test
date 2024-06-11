import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import { Paw } from '@/lib/icons';
import Modal from '@/components/Modal';
import { copyToClipboard, getTwitterShareLink } from '@/components/Modal/lib';

export default function SuccessModal({ kitId, open }: { kitId: string; open: boolean }) {
  return (
    <Modal open={open}>
      <Paw width={72} height={72} />
      <p>
        <h2 className={styles.title}>키트가 만들어졌어요!</h2>
        이제 친구와 스탬프 랠리가 가능합니다!
      </p>
      <hr className={styles.hr} />
      <Buttons kitId={kitId} />
    </Modal>
  );
}

function Buttons({ kitId }: { kitId: string }) {
  const path = `/kits/${kitId}`;
  return (
    <div className={styles.grid}>
      <span className={styles.span}>SNS로 키트 공유</span>
      <Link href={getTwitterShareLink(path)} className={styles.twitter}>
        {/* 트위터 공유 버튼 */}
        𝕏
      </Link>
      <button onClick={copyToClipboard(path)} className={styles.button}>
        {/* 링크 복사 버튼 */}
        <LinkIcon width={24} height={24} className="m-auto" />
      </button>
      <Link href="/" className={styles.link}>
        {/* 홈페이지로 이동 */}
        홈으로
      </Link>
      <Link href={path} className={styles.link2}>
        {/* 키트 페이지로 이동 */}
        키트 보러가기
      </Link>
    </div>
  );
}

const styles = {
  title: 'pb-2 text-xl font-bold text-foreground',
  hr: 'border-0.5 w-full',
  grid: 'grid grid-cols-2 gap-y-4 gap-x-2 w-full text-center',
  span: 'col-span-2',
  button: 'bg-foreground/5 text-foreground border rounded-full size-9 place-self-start',
  twitter: 'bg-foreground text-background rounded-full size-9 text-2xl p-1.5 place-self-end',
  link: 'bg-background text-foreground border rounded-xl w-full py-4',
  link2: 'bg-primary text-white rounded-xl w-full py-4',
};
