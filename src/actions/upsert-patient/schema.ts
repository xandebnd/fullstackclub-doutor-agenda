import { z } from "zod";

export const upsertPatientSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().trim().min(1, {
		message: "Nome é obrigatório",
	}),
	email: z.string().trim().email({
		message: "Email inválido",
	}),
	phoneNumber: z.string().trim().min(1, {
		message: "Telefone é obrigatório",
	}),
	sex: z.enum(["male", "female"], {
		required_error: "Sexo é obrigatório",
	}),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
