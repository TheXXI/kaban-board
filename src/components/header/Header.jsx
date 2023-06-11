import css from './header.module.scss'

export const Header = () => {
    return (
        <header className={css.header}>
            <h1>Kanban Board</h1>
        </header>
    );
}