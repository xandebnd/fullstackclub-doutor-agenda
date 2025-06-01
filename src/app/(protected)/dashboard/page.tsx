import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const DashboardPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/authentication");
	}

	if (!session.user.clinic) {
		redirect("/clinic-form");
	}

	return (
		<div>
			<p>Dashboard Page</p>
		</div>
	);
};

export default DashboardPage;
