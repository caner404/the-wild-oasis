import { FileInput, Form, FormRow, Input, Textarea } from '@/ui/Form';

import { Button, ButtonVariation } from '@/ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createEditCabin } from './api/apiCabins';
import { Cabin } from './type/Cabin';

type BaseCabinFormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
};
export type CabinFormData = BaseCabinFormData & {
  image: FileList;
};
export type EditFormData = BaseCabinFormData & {
  image: string;
};

const defaultValues: CabinFormData = {
  description: '',
  discount: 0,
  image: {} as FileList,
  maxCapacity: 0,
  name: '',
  regularPrice: 0,
};

export function CreateCabinForm({ editCabin }: { editCabin?: Cabin }) {
  const isEditMode =
    editCabin !== undefined ? { isEditSession: true, id: editCabin.id } : { isEditSession: false, id: undefined };

  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('new cabin succesfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const { mutate: editCabinFn } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin succesfuuly updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinFormData | EditFormData>({
    defaultValues: isEditMode.isEditSession ? { ...editCabin } : defaultValues,
  });

  function onSubmit(data: CabinFormData | EditFormData) {
    if (isEditMode.isEditSession) editCabinFn({ newCabin: { ...data }, id: isEditMode.id });
    createCabin({ newCabin: { ...data }, id: isEditMode.id });
  }

  function onError(errors: FieldErrors<CabinFormData | EditFormData>) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        error={errors.name?.message}
        label='Name'
      >
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        error={errors.maxCapacity?.message}
        label='MaxCapacity'
      >
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        error={errors.regularPrice?.message}
        label='RegularPrice'
      >
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow
        error={errors.discount?.message}
        label='Discount'
      >
        <Input
          type='number'
          id='discount'
          {...register('discount', {
            required: 'This field is required',
            validate: (value: number) =>
              value <= Number(getValues().regularPrice) || 'Discount should be less than regular price',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        error={errors.description?.message}
        label='Description'
      >
        <Textarea
          id='description'
          {...register('description', { required: 'This field is required' })}
          defaultValue=''
        />
      </FormRow>

      <FormRow label='Image'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', { required: isEditMode.isEditSession ? false : 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation={ButtonVariation.SECONDARY}
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditMode.isEditSession ? 'Edit cabin' : 'Add cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
