import css from './card.module.scss';
import {useParams, useNavigate} from 'react-router-dom'
import {Button} from "../../shared/buttons/button/Button";
import {IconRemove} from "../../shared/icons/icon-remove";
import {useTasks} from "../../../hooks/tasks/useTasks";
import {useEffect, useState} from "react";

export const Card = () => {
    const navigate = useNavigate();
    const {getTaskById, updateTask} = useTasks();
    const {cardId} = useParams();
    const [task, setTask] = useState();

    useEffect(() => {
        if (cardId) {
            setTask(getTaskById(cardId))
        }
    }, [cardId])

    const navigateBack = () => navigate(-1);

    return (
        <div className={css.card}>
            {task &&
            <div>
                <input className={css.name}
                          value={task.name}
                          onChange={(e) =>
                              setTask({
                                  ...task,
                                  name: e.target.value
                              })}
                />
                <textarea className={css.description}
                          onChange={(e) =>
                              setTask({
                                  ...task,
                                  description: e.target.value
                              })}
                          value={task.description}

                />
            </div>
            }
            <Button className={css['button-close']} onClick={navigateBack}>
                <IconRemove/>
            </Button>
            <div className={css.footer}>
                <button className={css['button-save']} onClick={() => {
                    updateTask(task);
                    navigateBack();
                }}>Save Card</button>
            </div>
        </div>
    )
}