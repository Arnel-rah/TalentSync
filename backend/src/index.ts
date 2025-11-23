import { z } from 'zod';

// Auth
export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
  role: z.enum(['CLIENT', 'FREELANCE']),
});
export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginRequest = z.infer<typeof loginSchema>;

// Missions
export const createMissionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  budget: z.number().min(50),
  skills: z.array(z.string().min(1)).min(1),
});
export type CreateMissionRequest = z.infer<typeof createMissionSchema>;

// Candidatures
export const applySchema = z.object({
  proposedPrice: z.number().min(10),
  coverLetter: z.string().min(10),
});
export type ApplyRequest = z.infer<typeof applySchema>;

// Paiements
export const checkoutSchema = z.object({
  missionId: z.string().min(1),
});
export type CheckoutRequest = z.infer<typeof checkoutSchema>;

// Erreurs communes
export const errorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  error: z.string(),
});
export type ErrorResponse = z.infer<typeof errorResponseSchema>;