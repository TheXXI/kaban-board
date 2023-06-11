import css from './fotter.module.scss'
import {useTasks} from "../../hooks/tasks/useTasks";

export const Footer = () => {
    const {getActiveTaskCount, getFinishedTaskCount } = useTasks();

    return (
        <footer className={css.footer}>
            <span>Active task: {getActiveTaskCount()}</span>
            <span>Finished task: {getFinishedTaskCount()}</span>
            <span>Kanban board by Mikhail, 2023</span>
        </footer>
    );
}