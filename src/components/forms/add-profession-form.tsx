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
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useAddProfessionMutation } from "@/api/professionApi";

const formSchema = z.object({
    name: z.string().min(1, { message: "" }),
    icon: z.string().min(1, { message: "" }),
});

export default function AddProfessionForm({ setIsOpen }) {

    const [add, { isLoading }] = useAddProfessionMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            icon: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            add(values)
            console.log(values)
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Выберите имя для профессии</FormLabel>
                            <FormControl>
                                <Input placeholder="Например, Дизайнер" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Emoji field */}
                <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Выберите эмодзи как иконку</FormLabel>
                            <div className="border rounded-md p-2">
                                <EmojiPicker
                                    onEmojiClick={(emojiData) => {
                                        field.onChange(emojiData.imageUrl);
                                    }}
                                    height={350}
                                    width="100%"
                                    lazyLoadEmojis
                                    theme={Theme.DARK}
                                />
                            </div>
                            <div className="flex text-sm mt-2 gap-1">
                                {field.value ? (
                                    <>
                                        <p>Выбранный эмодзи: </p>
                                        <img className="text-xl" width={20} height={20} src={field.value} />
                                    </>
                                ) : <p>Эмодзи не выбрано </p>}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button disabled={isLoading} type="submit">Сохранить</Button>
                </div>
            </form>
        </Form>
    );
}