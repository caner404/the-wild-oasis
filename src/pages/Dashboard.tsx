import { DashboardFilter, DashboardLayout } from '@/features/dashboard';

import { Row } from '@/ui/Layout';
import { Heading } from '../ui/Layout/Heading';

function Dashboard() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
