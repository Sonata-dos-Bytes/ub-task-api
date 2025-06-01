import { z } from 'zod';

export const profileSchema = z.object({
    login: z.string().nonempty('Login is required'),
    password: z.string().nonempty('Password is required'),
});
