import { SignupForm } from '@/features/authentication';
import { Heading } from '@/ui/Layout';

function NewUsers() {
  return (
    <>
      <Heading as='h1'>Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
