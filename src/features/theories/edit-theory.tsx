import EditTheoryForm from "@/components/forms/edit-theory-form";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Pencil } from "lucide-react";
import { FC, useState } from "react";

const EditTheory:FC<{theory?: any}> = ({theory}) => {
    const [isEditOpen, setIsEditOpen] = useState(false)
    return (
        <>
            <ResponsiveDialog
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                title="Edit theory"
                description={'Редактирование теории'}
            >
                <EditTheoryForm setIsOpen={setIsEditOpen} theory={theory} />
            </ResponsiveDialog>
            <button className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => setIsEditOpen(true)}
            >
                <Pencil width={18} />
            </button>
        </>
    )
}

export default EditTheory;

