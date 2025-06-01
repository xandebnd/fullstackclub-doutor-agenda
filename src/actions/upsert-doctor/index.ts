"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "../../db";
import { doctorsTable } from "../../db/schema";
import { auth } from "../../lib/auth";
import { actionClient } from "../../lib/next-safe-action";
import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
	.schema(upsertDoctorSchema)
	.action(async ({ parsedInput }) => {
		const availableFromTime = parsedInput.availableFromTime;
		const availableToTime = parsedInput.availableToTime;

		const availableFromTimeUTC = dayjs()
			.set("hour", +availableFromTime.split(":")[0])
			.set("minute", +availableFromTime.split(":")[1])
			.set("second", +availableFromTime.split(":")[2])
			.utc();

		const availableToTimeUTC = dayjs()
			.set("hour", +availableToTime.split(":")[0])
			.set("minute", +availableToTime.split(":")[1])
			.set("second", +availableToTime.split(":")[2])
			.utc();

		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) {
			throw new Error("Unauthorized");
		}

		if (!session?.user.clinic?.id) {
			throw new Error("Clinic not found");
		}

		await db
			.insert(doctorsTable)
			.values({
				...parsedInput,
				id: parsedInput.id,
				clinicId: session.user.clinic.id,
				availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
				availableToTime: availableToTimeUTC.format("HH:mm:ss"),
			})
			.onConflictDoUpdate({
				target: [doctorsTable.id],
				set: {
					...parsedInput,
				},
			});

		revalidatePath("/doctors");
	});
