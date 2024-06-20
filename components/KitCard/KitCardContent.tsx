import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent, CardTitle } from '@/components/ui/card';
import { Tag } from '@/components/Tag';
import { Bookmark, Heart } from '@/lib/icons';
import { KitCardVariants } from './types';
import { getConditions, getContentStyles } from './lib';

interface KitCardContentProps {
  title: string;
  tags: string[];
  name: string;
  image: string;
  variant: KitCardVariants;
}

export default function KitCardContent({ title, tags, name, image, variant }: KitCardContentProps) {
  const is = getConditions(variant);
  const styles = getContentStyles(is);
  return (
    <CardContent className={styles.content}>
      <CardTitle className={styles.title}>{title}</CardTitle>
      <Tags tags={tags} styles={styles} />
      {!is.StartPage && <Uploader name={name} image={image} styles={styles} />}
      {is.description && <Buttons styles={styles} />}
    </CardContent>
  );
}

function Tags({ tags, styles }: { tags: string[]; styles: ReturnType<typeof getContentStyles> }) {
  return (
    <div className={styles.tags}>
      {tags?.map((tag) => (
        <Tag key={tag} label={tag} className={styles.tag} />
      ))}
    </div>
  );
}

function Uploader({ name, image, styles }: { name: string; image: string; styles: ReturnType<typeof getContentStyles> }) {
  return (
    <div className={styles.uploader}>
      <Avatar className={styles.avatar}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <span className={styles.name}>{name}</span>
    </div>
  );
}

function Buttons({ styles }: { styles: ReturnType<typeof getContentStyles> }) {
  return (
    <div className={styles.buttons}>
      <button className={styles.button}>
        <Bookmark className={styles.bookmark} />
      </button>
      <button className={styles.button}>
        <Heart className={styles.heart} />
      </button>
    </div>
  );
}
