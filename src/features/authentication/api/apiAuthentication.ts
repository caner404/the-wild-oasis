import supabase, { supabaseUrl } from '@/services/supabase';
import { UserAttributes } from '@supabase/supabase-js';

export async function signup({ fullName, email, password }: { fullName: string; email: string; password: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  // when we successfully logged in this wont get called because we put the current user
  // in cache in useLogin(), we only need to make one request
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) {
  //1. Update password or fullName
  const updateData: UserAttributes = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar, { upsert: true });
  if (storageError) throw new Error(storageError.message);

  //3. Update avatar in the user
  const { data: updatedUser, error: updateUserError } = await supabase.auth.updateUser({
    data: {
      avatar: `
  ${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (updateUserError) throw new Error(updateUserError.message);

  return updatedUser;
}
