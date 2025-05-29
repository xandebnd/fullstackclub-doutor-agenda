"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, { message: "E-mail é obrigatório" })
		.email({ message: "E-mail inválido" }),
	password: z
		.string()
		.trim()
		.min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

const LoginForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log(values);
	}

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Faça login para continuar.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="Digite seu e-mail" {...field} />
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											placeholder="Digite sua senha"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Entrar
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

export default LoginForm;
