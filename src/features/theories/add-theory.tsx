import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { ResponsiveDialog } from "../../components/ui/responsive-dialog";
import AddTheoryForm from "../../components/forms/add-theory-form";

export const AddTheory:FC<{skillId: number, parentTheory?: any}> = ({skillId, parentTheory}) => {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const description = parentTheory ? `Эта теория станет сабтеорией для теории: "${parentTheory?.title}"` : "Эта теория будет добавлена в корень дерева теорий"
    return (
        <>
            <ResponsiveDialog
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                title="Add theory"
                description={description}
            >
                <AddTheoryForm skillId={skillId} setIsOpen={setIsAddOpen} parentTheoryId={parentTheory?.id} />
            </ResponsiveDialog>
            <button
                onClick={() => setIsAddOpen(true)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
                <Plus width={18} />
            </button>
        </>

    )
}
