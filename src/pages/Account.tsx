import { UpdateUserDataForm } from '@/features/authentication';
import { UpdatePasswordForm } from '@/features/authentication/';
import { Heading, Row } from '@/ui/Layout';

function Account() {
  return (
    <>
      <Heading as='h1'>Update your account</Heading>

      <Row>
        <Heading as='h2'>Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as='h2'>Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
