import styles from "./numbers-order.module.css";
import PropTypes from 'prop-types';

export const NumbersOrder = ({ total, totalToday, ordersArray }) => {
    const done = ordersArray.filter(el => el.status === "done");
    const created = ordersArray.filter(el => el.status === "created");
    return (
        <div className={styles.numbers_order}>
            <div className={styles.numbers}>
                <div>
                    <h2 className="text text_type_main-medium">Готовы:</h2>
                    <ul className={styles.list}>
                        {done.map(({ number, _id }) => {
                            return <li className={`text text_type_digits-default ${styles.all_order}`} key={_id}>{number}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <h2 className="text text_type_main-medium">В работе:</h2>
                    <ul className={styles.list}>
                        {
                            created.map(({ number, _id }) => {
                                return <li className="text text_type_digits-default" key={_id}>{number}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <p className={`text text_type_digits-large ${styles.count}`}>{total}</p>
            </div>
            <div>
                <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                <p className={`text text_type_digits-large ${styles.count}`}>{totalToday}</p>
            </div>
        </div>
    )
}

NumbersOrder.propTypes = {
    total: PropTypes.number.isRequired,
    totalToday: PropTypes.number.isRequired,
    ordersArray: PropTypes.array.isRequired,
}