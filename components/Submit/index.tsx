import type { FormState } from 'react-hook-form';
import { ButtonProps, BasicButton as Button, ButtonVariant } from '@/components/ui/button';
import type { ZodType } from 'zod';

interface SubmitProps<FormValues extends ZodType<any, any, any>> extends ButtonProps {
  state: FormState<FormValues>;
}

export default function Submit<FormValues extends ZodType<any, any, any>>({ children, state }: SubmitProps<FormValues>) {
  const disabled = !state.isValid || state.isSubmitting;
  const variant: ButtonVariant = disabled ? 'disabled' : 'default';

  return (
    <Button type="submit" disabled={disabled} className={styles.button} variant={variant}>
      {children}
    </Button>
  );
}
const styles = {
  button: 'w-full',
};
