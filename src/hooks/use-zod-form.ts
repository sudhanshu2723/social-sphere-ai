import { UseMutateFunction } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z, ZodSchema } from 'zod'


// The useZodForm function is a custom hook built on top 
// of the react-hook-form library and zod validation.
//  It streamlines form handling by integrating 
// schema-based validation (zod) and mutation handling 
// (@tanstack/react-query)
const useZodForm = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValues?: any
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }))
  return {
    register,
    errors,
    onFormSubmit,
    watch,
    reset,
  }
}

export default useZodForm

// register:
// A function used to connect form inputs (e.g., <input>, <textarea>) to react-hook-for
// m. It helps manage their state and validation.

// errors:
// Contains validation errors, mapped by field name. If a field fails validation, its error message can be accessed here.


// onFormSubmit:
// A function that wraps the handleSubmit method from react-hook-form. When called, it validates the form, and if valid, executes the mutation function with the form's values.

// watch:
// A function that watches specific form fields or the entire form for changes in their values.

// reset:
// A function that resets the form's values to their initial state or a specified state.