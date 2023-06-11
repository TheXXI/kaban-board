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

    

    const {getTasksByState, getTasksByExcludedState, addTask, moveTask, removeTask } = useTasks();

    const tasks = getTasksByState(props.state);
    const hasTasks = tasks.length > 0;

    const onInputCard = (e) => {
        setInputCardName(e.target.value);
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
                        <input type="text" onInput={onInputCard}/>
                    </div>
                    }

                    {isNewTaskSelectShown &&
                    <select onChange={(e) =>
                        setSelectedTaskId(e.target.value)
                    }>
                        <option>Select Task</option>
                        {getTasksByExcludedState(props.state).map(
                            (task) =>
                                <option key={task.id} value={task.id}>{task.name}</option>
                        )}
                    </select>
                    }
                </div>
                <div className={css.footer}>
                    
                    {(!isNewTaskInputShown && !isNewTaskSelectShown) &&
                    <button className={css.button} onClick={() => props.state === 'backlog'
                        ? setIsNewTaskInputShown(true)
                        : setIsNewTaskSelectShown(true)}
                    >Add Task</button>}

                    {(isNewTaskInputShown || isNewTaskSelectShown) &&
                    <button className={css.button} onClick={() => {
                        if (props.state === 'backlog') {
                            setIsNewTaskInputShown(false)
                            addTask(inputCardName)
                            setInputCardName(undefined)
                        } else {
                            setIsNewTaskSelectShown(false)
                            moveTask(selectedTaskId, props.state)
                        }
                    }
                    }>Submit</button>
                    }

                    {(isNewTaskInputShown || isNewTaskSelectShown)
                    && <button onClick={() =>
                        props.state === 'backlog'
                            ? setIsNewTaskInputShown(false)
                            : setIsNewTaskSelectShown(false)
                    }> Hide</button>}
                </div>
            </div>
        </div>
    );
}