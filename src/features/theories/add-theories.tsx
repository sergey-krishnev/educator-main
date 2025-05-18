import { FC, useState } from "react";
import { ResponsiveDialog } from "../../components/ui/responsive-dialog";
import { ListPlus } from "lucide-react";
import AddTheoriesForm from "@/components/forms/add-theories-form";

export const AddTheories:FC<{skillId: number, parentTheory?: any, depth: number}> = ({skillId, parentTheory, depth}) => {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const description = parentTheory ? `Эти теории станут сабтеорией для теории: "${parentTheory?.title}"` : "Эта теория будет добавлена в корень дерева теорий"
    const maxDepth = 3
    return (
        <>
            <ResponsiveDialog
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                title="Add theory with subtheories"
                description={description}
            >
                <AddTheoriesForm skillId={skillId} setIsOpen={setIsAddOpen} />
            </ResponsiveDialog>
            <button
                onClick={() => setIsAddOpen(true)}
                disabled={depth > maxDepth}
                className={`text-muted-foreground hover:text-foreground cursor-pointer ${depth > maxDepth ? "opacity-50 cursor-not-allowed hover:text-muted-foreground" : ""}`}
            >
                <ListPlus width={18} />
            </button>
        </>

    )
}