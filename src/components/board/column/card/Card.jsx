import css from './card.module.scss';
import { Button } from '../../../shared/buttons/button/Button';
import {IconRemove} from "../../../shared/icons/icon-remove";

export const Card = (props) => {
    return (
        <div className={css.card}>
            <span>{props.name}</span>
            <Button className={css['button-remove']} onClick={
                (e) => {
                    props.onRemove(props.id)
                    e.stopPropagation();
                }
            }>
                <IconRemove/>
            </Button>
        </div>
    );
}