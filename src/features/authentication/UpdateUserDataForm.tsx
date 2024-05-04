import { useState } from 'react';

import { useUser } from './hooks/useUser';
import { FileInput, Form, FormRow, Input } from '@/ui/Form';
import { Button, ButtonVariation } from '@/ui/Button';

export function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState({} as File);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input
          value={email}
          disabled
        />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => (e.target.files ? setAvatar(e.target.files[0]) : {})}
        />
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          $variation={ButtonVariation.SECONDARY}
        >
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}
