import supabase from '@/services/supabase';
import { Cabin } from '../type/Cabin';

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('Cabins').select('*');
  if (error) throw new Error('Cabins could not be loaded');
  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id);
  if (error) throw new Error(`Cabin with id: ${id} could not be deleted`);
  return data;
}
