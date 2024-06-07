'use client';

import { useState } from 'react';
import { MAKING_MESSAGE } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/stories/Button';

export default function NicknameInput({ name }: { name: string }) {
  // const ref = createRef<HTMLInputElement>();
  const [value, setValue] = useState(name);
  const modified = value !== name;
  return (
    <form>
      <label>
        닉네임
        <Input
          disabled
          value={value}
          onClick={() => alert(MAKING_MESSAGE)}
          /* onChange={(e) => setValue(e.target.value)} */
        />
      </label>
      <Button
        label="수정하기"
        variant={modified ? 'default' : 'disabled'}
        className={styles.modifyButton}
        type="button"
        onClick={() => alert(MAKING_MESSAGE)}
      />
    </form>
  );
}

const styles = {
  modifyButton: 'fixed w-[min(calc(100%-2rem),688px)] min-w-[328px] bottom-4',
};
