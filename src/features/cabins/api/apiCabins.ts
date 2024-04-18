import supabase from '@/services/supabase';
import { Cabin } from '../type/Cabin';

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('Cabins').select('*');
  if (error) throw new Error('Cabins could not be loaded');
  return data;
}

export async function createCabin(newCabin: Partial<Cabin>) {
  const { data, error } = await supabase
    .from('Cabins')
    //THIS WORKS BECAUSE THE FORM FIELD NAMES ARE EXACTLY THE SAME AS
    // IN THE SUPABASE CABIN TABLE
    .insert([newCabin])
    .select();
  if (error) throw new Error(`Cabin could not be created`);
  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id);
  if (error) throw new Error(`Cabin with id: ${id} could not be deleted`);
  return data;
}
