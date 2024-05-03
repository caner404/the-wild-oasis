import { Button, ButtonSize, ButtonVariation } from '@/ui/Button';

function CheckoutButton({ bookingId }: { bookingId: number }) {
  return (
    <Button
      $variation={ButtonVariation.PRIMARY}
      $size={ButtonSize.SMALL}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
