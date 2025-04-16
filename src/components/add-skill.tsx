import { PlusIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { ResponsiveDialog } from "./responsive-dialog";
import { useState } from "react";
import AddSkillForm from "./add-skill-form";

const AddSkill = ({
    activeProfessionId,
}) => {

    const [isAddOpen, setIsAddOpen] = useState(false)

    return (
        <>
            <ResponsiveDialog
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                title="Add skill"
                description="Any required skill from any place"
            >
                <AddSkillForm activeProfessionId={activeProfessionId} setIsOpen={setIsAddOpen} />
            </ResponsiveDialog>
            <SidebarMenuItem key={'addSkill'}>
                <SidebarMenuButton
                    tooltip={{
                        children: 'Add new skill',
                        hidden: false,
                    }}
                    onClick={() => {
                        setIsAddOpen(true)
                    }}
                    className="px-2.5 md:px-2 cursor-pointer"
                >
                    <PlusIcon />
                    <span>Add new skill</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </>
    );
};

export default AddSkill;