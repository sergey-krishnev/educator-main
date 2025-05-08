import { useDeleteTheoryMutation } from "@/api/theoryApi";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const DeleteTheory = ({ onRemove, theory }) => {

    const [isRemoveOpen, setRemoveOpen] = useState(false)
    const [remove] = useDeleteTheoryMutation()
    
    const handleConfirmRemove = async (id: number) => {
        try {
            await remove(id).unwrap();
            onRemove();
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
                title={`Are you sure you want to remove theory "${theory?.title}"`}
                description="This action cannot be undone. You will lose all subtheories related to this theory."
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
                            handleConfirmRemove(theory?.id)
                        }}
                    >
                        Remove
                    </Button>
                </DialogFooter>
            </ResponsiveDialog>
            <button className="text-muted-foreground hover:text-destructive cursor-pointer"
                onClick={() => setRemoveOpen(true)}
            >
                <Trash2 width={18} />
            </button>
        </>
    )
}

export default DeleteTheory;

