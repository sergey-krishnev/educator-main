import { useDeleteSkillFromProfessionMutation } from "@/api/professionApi";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const DeleteSkill = ({ activeProfession, skill, setSkill }) => {

    const [isRemoveOpen, setRemoveOpen] = useState(false)
    const [remove] = useDeleteSkillFromProfessionMutation()

    const handleConfirmRemove = async (skillId: number, professionId: number) => {
        try {
            await remove({skillId, professionId}).unwrap();
            setSkill(null);
            setRemoveOpen(false);
        } catch (error) {
            console.error("Failed to delete theory:", error);
        }
    }

    return (
        <>
            <ResponsiveDialog
                isOpen={isRemoveOpen}
                setIsOpen={setRemoveOpen}
                title={`Are you sure you want to remove skill "${skill?.name}" from profession "${activeProfession?.name}"?`}
                description="This action cannot be undone"
            >
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setRemoveOpen(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            handleConfirmRemove(skill?.id, activeProfession?.id)
                        }}
                    >
                        Remove
                    </Button>
                </DialogFooter>
            </ResponsiveDialog>
            <button
                onClick={() => setRemoveOpen(true)}
                className="text-muted-foreground hover:text-destructive cursor-pointer"
            >
                <Trash2 width={18} />
            </button>
        </>
    )
}

export default DeleteSkill;

