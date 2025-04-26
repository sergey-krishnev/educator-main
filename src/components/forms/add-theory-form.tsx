import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAddNewTheoryToSkillMutation } from "@/api/skillApi";

const formSchema = z.object({
    title: z.string().min(1, { message: "" }),
    content: z.string().min(1, { message: "" }),
});

export default function AddTheoryForm({ setIsOpen, skillId, parentTheoryId }) {

    const [add] = useAddNewTheoryToSkillMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)
            add({ 
                title: values.title,
                content: values.content,
                skillId,
                ...(parentTheoryId ? {parent: Number(parentTheoryId)} : {})
            })
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Выберите название для теоретического материала</FormLabel>
                            <FormControl>
                                <Input placeholder="Например, модификаторы доступа" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Напишите сам теоретический материал</FormLabel>
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