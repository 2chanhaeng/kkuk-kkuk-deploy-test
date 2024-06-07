// 'use client';

import { useRouter } from 'next/navigation';
import { MAKING_MESSAGE } from '@/lib/constants';
import DeleteAccount from './DeleteAccount';

import Link from 'next/link';

export function UserSettings() {
  const router = useRouter();
  return (
    <section className={styles.default}>
      <button className={styles.button}>로그아웃</button>
      <Link href="/my/settings/delete-account" className={styles.deleteAccount}>
        회원탈퇴
      </Link>
      <button className={styles.button} onClick={() => router.push('/api/auth/signout')}>
        로그아웃
      </button>
      <button className={cn(styles.button, styles.delete)} onClick={() => alert(MAKING_MESSAGE)}>
        회원탈퇴
      </button>
    </section>
  );
}

const styles = {
  default: 'flex flex-col w-full bg-grey-50 divide-y',
  button: 'p-4 bg-background w-full text-left',
  deleteAccount: 'p-4 bg-background w-full text-left text-red-500',
};
