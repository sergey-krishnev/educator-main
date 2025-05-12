import EditSkillForm from "@/components/forms/edit-skill-form";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";

const EditSkill = ({skill, activeProfessionId, setSkill}) => {
    const [isEditOpen, setIsEditOpen] = useState(false)

    return (
        <>
            <ResponsiveDialog
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                title="Edit skill"
                description={'Редактирование скилла'}
            >
                <EditSkillForm setIsOpen={setIsEditOpen} skill={skill} activeProfessionId={activeProfessionId} setSkill={setSkill} />
            </ResponsiveDialog>
            <button
                onClick={() => { setIsEditOpen(true) }}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
                <Pencil width={18} />
            </button>
        </>
    )
}

export default EditSkill;

