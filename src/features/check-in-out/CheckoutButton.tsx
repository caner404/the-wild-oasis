import { Button, ButtonSize, ButtonVariation } from '@/ui/Button';
import { useCheckOut } from './hooks';

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { isCheckout, checkout } = useCheckOut();
  return (
    <Button
      $variation={ButtonVariation.PRIMARY}
      $size={ButtonSize.SMALL}
      onClick={() => checkout(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
