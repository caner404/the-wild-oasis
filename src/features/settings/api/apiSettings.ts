import supabase from '@/services/supabase';
import { Setting } from '../type/Setting';
export async function getSettings(): Promise<Setting> {
  const { data, error } = await supabase.from('Settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: Partial<Setting>) {
  const { data, error } = await supabase
    .from('Settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
