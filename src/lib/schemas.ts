import { z } from 'zod';

export const UserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().nullable().optional(),
  photoURL: z.string().url().nullable().optional(),
});

export type UserProfile = z.infer<typeof UserSchema>;

export const LocationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const MapConfigSchema = z.object({
  center: LocationSchema,
  zoom: z.number().min(0).max(22),
});

export type MapConfig = z.infer<typeof MapConfigSchema>;
