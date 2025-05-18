import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useAddNewTheoryToSkillMutation } from "@/api/skillApi";

const formSchema = z.object({
    theory: z.string().min(1, { message: "" }),
});

export default function AddTheoriesForm({ setIsOpen, skillId }) {

    const [add] = useAddNewTheoryToSkillMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            theory: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const parsedTheory = JSON.parse(values.theory)
            if (Array.isArray(parsedTheory)) {
                throw new Error("Theory should be an object, not an array");
            }
            add({skillId, ...parsedTheory})
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
                    name="theory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Вставьте сюда теорию в формате JSON</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Например, чем дальше в лес, скибиди-доб-доб-ес-ес" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button disabled={false} type="submit">Сохранить</Button>
                </div>
            </form>
        </Form>
    );
}