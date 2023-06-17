import { TaskProvider } from '../../hooks/tasks/taskProvider';
import {LayoutProvider} from "../../hooks/layout/layoutProvider";
import css from './layout.module.scss'

export const Layout = (props) => {
    return (
        <TaskProvider>
            <LayoutProvider>
                <div className={css.layout}>{props.children}</div>
            </LayoutProvider>
        </TaskProvider>
    )
}