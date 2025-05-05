import { IInstrumento } from "../../../types/IInstrumento"
import { Instrumento } from "../Instrumento/Instrumento";
import styles from "./ListInstrumentos.module.css"

interface IListItems<T> {
    items: T[];
    message: String;
}

export const ListInstrumentos  = ({items, message}: IListItems<IInstrumento>) => {

    return (
        <div className={styles.containerInstrumentosList} >
            {
                items.length > 0 ? (
                    items.map((item, index) => (
                        <Instrumento key={index} instrumento={item} />
                    ))
                ) : (
                    <div className={styles.messageList}><p>{message}</p></div>
                )
            }
        </div>
    )
}
