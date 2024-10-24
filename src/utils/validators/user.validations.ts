import Joi from 'joi';
import { iCreateUser } from '../../types/user.type';

export const createUserDataValidation = (data: iCreateUser) => {
  const createUserSchema = Joi.object({
    firstName: Joi.string().trim().label('First name').exist().min(3).messages({
      'any.required': 'First name is required.',
      'string.min': 'First name must be at least 3 characters long.',
    }),
    lastName: Joi.string().trim().label('Last name').exist().min(3).messages({
      'any.required': 'Last name is required.',
      'string.min': 'Last name must be at least 3 characters long.',
    }),
    email: Joi.string().label('email').exist().email().messages({
      'any.required': 'Email is required.',
      'string.email': 'Email is invalid.',
    }),
    phoneNo: Joi.string().label('Phone number').exist().length(10).messages({
      'any.required': 'Phone number is required.',
      'string.length': 'Inavlid phone number.',
    }),
    password: Joi.string()
      .label('Password')
      .required()
      .min(8)
      .max(30)
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};":\\\\|,.<>\\/?]+$'))
      .messages({
        'any.required': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.',
        'string.max': 'Password must be at most 30 characters long.',
        'string.pattern.base': 'Password can only contain letters, numbers, and special characters.',
      }),
    userType: Joi.string().label('User type').allow('').optional(),
  });
  return createUserSchema.validate(data);
};
