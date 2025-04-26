import { useGetTheoriesBySkillIdQuery } from "@/api/skillApi"
import { SortableTree } from "../../components/Tree/SortableTree"

const TreeTheories = ({ skillId }) => {
    const { data: theories, isLoading: isLoadingTheories } = useGetTheoriesBySkillIdQuery(skillId)

    if (isLoadingTheories) {
        return <div>Loading...</div>
    }

    // Рекурсивная функция для преобразования структуры
    const transformToTreeData = (theory: any) => ({
        id: theory.id.toString(),
        name: theory.title,
        children: (theory.subTheories || []).map(transformToTreeData), // Рекурсивно преобразуем subtheories в children
        skill: theory.skill,
    })

    // Преобразуем весь массив theories
    const treeData = theories.map(transformToTreeData)

    return (
        <SortableTree defaultItems={treeData} collapsible indicator removable />
    )
}

export default TreeTheories
