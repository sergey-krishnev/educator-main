import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPopoverPicker() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover onOpenChange={setIsOpen} open={isOpen}>
            <PopoverTrigger asChild>
                <Button>Open emoji picker</Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
                <EmojiPicker onEmojiClick={emoji => {
                    console.log(emoji)
                }} />
            </PopoverContent>
        </Popover>
    )
}