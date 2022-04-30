import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import styles from "./styles.module.scss"

export function Header(){
    const currentDate = format(new Date(), "EEEEEE, d, MMMM",{
        locale:ptBR
    });
    return(
        <header className={styles.headerContainer}>
            <a href="http://localhost:3000/">
            <img src="/logo.svg" alt="podcastr" />
            </a>
            <p>O melhor para você, sempre</p>
            <span>{currentDate}</span>
        </header>
    )
}