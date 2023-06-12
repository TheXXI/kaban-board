import Scrollbars from "react-custom-scrollbars-2";
import { Card } from "./card/Card";
import css from './column.module.scss'
import {useTasks} from "../../../hooks/tasks/useTasks";
import {useState} from "react";

export const Column = (props) => {
    const [isNewTaskInputShown, setIsNewTaskInputShown] = useState(false);
    const [inputCardName, setInputCardName] = useState();

    const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(undefined);

    

    const {getTasksByState, getTasksToMove, addTask, moveTask, removeTask } = useTasks();

    const tasks = getTasksByState(props.state);
    const hasTasks = tasks.length > 0;

    const onInputCard = (e) => {
        setInputCardName((e.target.value).trim());
    }

    const tasksToMoveCount = () => {
        if (props.state === 'backlog') return 0;
        return getTasksToMove(props.state).length;
    }

    return (
        <div className={css.column}>
            <div className={css.header}>{props.name}</div>
            <div className={css.wrapper}>
                <div className={css.body}>
                    {hasTasks &&
                    <Scrollbars autoHeight autoHeightMax={500}>
                        {
                            tasks.map((task) =>
                                <Card key={task.id} id={task.id} name={task.name} 
                                    onRemove={(id) => {
                                        removeTask(id);
                                    }
                                }/>
                            )
                        }
                    </Scrollbars>
                    }

                    {isNewTaskInputShown && 
                    <div>
                        <input type="text" onInput={onInputCard} placeholder="Task name"/>
                    </div>
                    }

                    {isNewTaskSelectShown &&
                    <select onChange={(e) =>
                        setSelectedTaskId(e.target.value)
                    }>
                        <option>Select Task</option>
                        {getTasksToMove(props.state).map(
                        
                            (task) =>
                                <option key={task.id} value={task.id}>{task.name}</option>
                        )}
                    </select>
                    }
                </div>
                <div className={css.footer}>

                    {(!isNewTaskInputShown && props.state === 'backlog') &&
                    <button className={css.button} onClick={() => setIsNewTaskInputShown(true)}>+ Add Task</button>}
                    
                    {(!isNewTaskSelectShown && props.state !== 'backlog') &&
                    <button className={css.button} 
                    disabled={getTasksToMove(props.state).length === 0} 
                    onClick={() => 
                        setIsNewTaskSelectShown(true)}
                    >+ Add Task</button>}

                    {(isNewTaskInputShown || isNewTaskSelectShown) &&
                    <button className={css.button} onClick={() => {
                        if (props.state === 'backlog') {
                            setIsNewTaskInputShown(false)
                            if (inputCardName) {
                                console.log(inputCardName)
                                addTask(inputCardName)
                            }
                            setInputCardName(undefined)
                        } else {
                            setIsNewTaskSelectShown(false)
                            moveTask(selectedTaskId, props.state)
                        }
                    }
                    }>Submit</button>
                    }

                    {(isNewTaskInputShown || isNewTaskSelectShown)
                    && <button className={css.button} onClick={() =>
                        props.state === 'backlog'
                            ? setIsNewTaskInputShown(false)
                            : setIsNewTaskSelectShown(false)
                    }> Hide</button>}
                </div>
            </div>
        </div>
    );
}