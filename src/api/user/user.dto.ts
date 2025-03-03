import {z} from "zod";

export const registrationUserDto = z.object({
    email: z.string({required_error: 'The email is required'}).email('Email is not valid'),
    avatar: z.string({required_error: 'The avatar is required'}).min(1, 'The avatar field is too small'),
    name: z.string({required_error: 'The name is required'}).min(1, 'The name field is too small'),
    role: z.string({required_error: 'The role is required'}).min(1, 'The role field is too small'),
    password: z.string({required_error: 'The password is required'}).min(5, 'The password field is too small')
})

export const loginUserDto = z.object({
    email: z.string({required_error: 'The email is required'}).email('Email is not valid'),
    password: z.string({required_error: 'The role is required'}).min(5, 'The password field is too small')
})