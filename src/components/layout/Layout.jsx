import { TaskProvider } from '../../hooks/tasks/taskProvider';
import css from './layout.module.scss'

export const Layout = (props) => {
    return (
        <TaskProvider>
            <div className={css.layout}>
                {props.children}
            </div>
        </TaskProvider>
    );
}