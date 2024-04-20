import supabase, { supabaseUrl } from '@/services/supabase';
import { CabinFormData, EditFormData } from '../CreateCabinForm';
import { Cabin } from '../type/Cabin';

//https://wdtmtgkbnqegqrnbkbzq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('Cabins').select('*');
  if (error) throw new Error('Cabins could not be loaded');
  return data;
}

export async function createEditCabin({
  newCabin,
  id,
}: {
  newCabin: CabinFormData | EditFormData;
  id: number | undefined;
}) {
  let imageName;
  let imagePath;
  let cabinFile;
  let hasImagePath = false;

  if (typeof newCabin.image === 'string') {
    imagePath = `${newCabin.image}`;
    hasImagePath = true;
  }

  if (newCabin.image instanceof FileList) {
    cabinFile = newCabin.image.item(0)!;
    imageName = `${Math.random()}-${cabinFile.name}`.replace('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const insertStatement = supabase
    .from('Cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  const updateStatement = supabase
    .from('Cabins')
    .update({ ...newCabin, image: imagePath })
    .eq('id', id)
    .select();

  const { data, error } = !id ? await insertStatement : await updateStatement;
  if (error) throw new Error(`Cabin could not be created`);
  if (hasImagePath) return data;
  uploadImage(imageName!, cabinFile!, data[0] as Cabin);

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id);
  if (error) throw new Error(`Cabin with id: ${id} could not be deleted`);
  return data;
}

async function uploadImage(imageName: string, cabinFile: File, cabin: Cabin) {
  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName!, cabinFile!);
  if (storageError) {
    //3. Delete cabin when imageUpload was an error;
    await supabase.from('Cabins').delete().eq('id', cabin.id);
    console.log(storageError);
    throw new Error('Cabin could not be uploaded and the cabin was not created');
  }
}
