import { Button, ButtonVariation } from '@/ui/Button';
import { Form, FormRow, Input } from '@/ui/Form';
import { useForm } from 'react-hook-form';
import { useSignup } from './hooks';

// Email regex: /\S+@\S+\.\S+/

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function SignupForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<SignUpData>();
  const { signup, isLoading } = useSignup();

  function onValid(data: SignUpData) {
    signup({ fullName: data.fullName, password: data.password, email: data.email }, { onSettled: () => reset });
  }
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <FormRow
        label='Full name'
        error={errors.fullName?.message}
      >
        <Input
          type='text'
          id='fullName'
          disabled={isLoading}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label='Email address'
        error={errors.email?.message}
      >
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid emal',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors.password?.message}
      >
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: { value: 8, message: 'Paasword needs a minimum of 8 characters' },
          })}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation={ButtonVariation.SECONDARY}
          type='reset'
          disabled={isLoading}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
