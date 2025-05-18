import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { ResponsiveDialog } from "../../components/ui/responsive-dialog";
import AddTheoryForm from "../../components/forms/add-theory-form";

export const AddTheory:FC<{skillId: number, parentTheory?: any, depth: number}> = ({skillId, parentTheory, depth}) => {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const description = parentTheory ? `Эта теория станет сабтеорией для теории: "${parentTheory?.title}"` : "Эта теория будет добавлена в корень дерева теорий"
    const maxDepth = 3
    console.log(depth, maxDepth, parentTheory)
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
                disabled={depth > maxDepth}
                className={`text-muted-foreground hover:text-foreground cursor-pointer ${depth > maxDepth ? "opacity-50 cursor-not-allowed hover:text-muted-foreground" : ""}`}
            >
                <Plus width={18} />
            </button>
        </>

    )
}
