import { useState } from 'react';

import { useUser } from './hooks/useUser';
import { FileInput, Form, FormRow, Input } from '@/ui/Form';
import { Button, ButtonVariation } from '@/ui/Button';
import { useUpdateUser } from './hooks';

export function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { updateCurrentUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(user?.user_metadata.fullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (!fullName) return;
    updateCurrentUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          formElement.reset();
          setAvatar(null);
        },
      }
    );
  }

  function handleCancel() {
    setFullName(user?.user_metadata.fullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input
          value={user?.email}
          disabled
        />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => (e.target.files?.item(0) ? setAvatar(e.target.files[0]) : null)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          $variation={ButtonVariation.SECONDARY}
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}
