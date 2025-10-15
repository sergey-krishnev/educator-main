import { useGetUserProgressQuery } from "@/api/userProgressApi";
import AddUserForm from "@/components/forms/add-user-form";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import React from "react";

const CreateUserProgress = () => {
    const [isAddOpen, setIsAddOpen] = React.useState(false);

    const { data: userProgress, isError } = useGetUserProgressQuery({})

    React.useEffect(() => {
        if (isError && !userProgress) {
            setIsAddOpen(true);
        }
    }, [isError, userProgress]);

    return (
        <ResponsiveDialog isOpen={isAddOpen}
            setIsOpen={() => {}}
            title="Registering new user"
            description={'This needs for managing your user progress'}>
            <div className="p-4" />
            <AddUserForm setIsOpen={setIsAddOpen}/>
        </ResponsiveDialog>
    )
}

export default CreateUserProgress;


