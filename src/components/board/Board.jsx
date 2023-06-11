import { Column } from "./column/Column";
import css from './board.module.scss'
import { useTasks } from "../../hooks/tasks/useTasks";

export const Board = () => {
    const {states} = useTasks();

    return (
        <div className={css.board}>
            {states.map(
                (state) =>
                    <Column key={state.id} name={state.name} state={state.state}/>
            )}
        </div>
    )
}