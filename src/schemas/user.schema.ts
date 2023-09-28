import { object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});
