import Image from 'next/image';
import { Trash } from '@/lib/icons';
import { StampsField } from '../types';
import { stampPreviewStyles, stampPreviewImageStyles, stampTrashIconStyles } from './styles';

interface StampPreviewProps {
  index: number;
  field: StampsField;
}
export default function StampPreview({ index, field }: StampPreviewProps) {
  const { blob } = field.fields[index];

  return (
    <div className={stampPreviewStyles}>
      <Trash className={stampTrashIconStyles} onClick={() => setFile(undefined)} />
      <Image src={blob} className={stampPreviewImageStyles} alt={`${index + 1}번째 스탬프`} fill sizes="360" priority />
    </div>
  );
}
