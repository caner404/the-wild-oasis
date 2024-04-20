import { UpdateSettingsForm } from '@/features/settings/UpdateSettingsForm';
import { Heading, Row } from '@/ui/Layout';

function Settings() {
  return (
    <Row>
      <Heading as='h1'>Update hotel settings</Heading>;
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
