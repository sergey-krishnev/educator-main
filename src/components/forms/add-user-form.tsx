import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateUserProgressMutation } from "@/api/userProgressApi";

const formSchema = z.object({
    userName: z.string().min(1, { message: "" }),
});

export default function AddUserForm({ setIsOpen }) {

    const [add, { isLoading }] = useCreateUserProgressMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            add(values.userName)
            setIsOpen(false)
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-md mx-auto"
            >
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Выберите имя</FormLabel>
                            <FormControl>
                                <Input placeholder="Например, красавчик228" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button disabled={isLoading} type="submit">Создать профиль</Button>
                </div>
            </form>
        </Form>
    );
}