import { getStaysTodayActivity } from '@/features/bookings';
import { useQuery } from '@tanstack/react-query';

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  });
  return { activities, isLoading };
}
