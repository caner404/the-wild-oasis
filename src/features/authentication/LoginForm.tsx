import { Button, ButtonSize } from '@/ui/Button';
import { Form, FormRowVertical, Input } from '@/ui/Form';
import SpinnerMini from '@/ui/SpinnerMini';
import { useState } from 'react';
import { useLogin } from './hooks/useLogin';

export function LoginForm() {
  const [email, setEmail] = useState('caner@example.com');
  const [password, setPassword] = useState('caner_1996');
  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button
          $size={ButtonSize.LARGE}
          disabled={isLoading}
        >
          {!isLoading ? 'Log in ' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}
