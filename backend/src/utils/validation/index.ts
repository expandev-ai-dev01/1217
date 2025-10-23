import { z } from 'zod';

/**
 * @summary
 * Zod schema for string validation (1-255 characters)
 */
export const zString = z.string().min(1).max(255);

/**
 * @summary
 * Zod schema for nullable string validation
 */
export const zNullableString = z.string().max(255).nullable();

/**
 * @summary
 * Zod schema for name validation (1-100 characters)
 */
export const zName = z.string().min(1).max(100);

/**
 * @summary
 * Zod schema for description validation (nullable, max 500 characters)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary
 * Zod schema for foreign key validation (positive integer)
 */
export const zFK = z.coerce.number().int().positive();

/**
 * @summary
 * Zod schema for nullable foreign key validation
 */
export const zNullableFK = z.coerce.number().int().positive().nullable();

/**
 * @summary
 * Zod schema for bit/boolean validation
 */
export const zBit = z.coerce.number().int().min(0).max(1);

/**
 * @summary
 * Zod schema for date string validation (ISO format)
 */
export const zDateString = z.string().datetime();
