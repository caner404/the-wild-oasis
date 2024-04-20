import { Form, FormRow, Input } from '@/ui/Form';
import { useSettings } from './hooks/useSettings';
import Spinner from '@/ui/Spinner';
import { useUpdateSetting } from './hooks/useUpdateSettings';
import { Setting } from './type/Setting';

export function UpdateSettingsForm() {
  // normally settings is undefined at the beginning so we cant destructure the object
  // by setting it initially to an empty object we can bypass this problem
  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } =
    useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e: React.FocusEvent<HTMLInputElement, Element>, fieldName: keyof Setting) {
    if (!e.target.value) return;
    updateSetting({ [fieldName]: e.target.value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}
