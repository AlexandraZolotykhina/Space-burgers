import styles from "./orders-details.module.css";
import { useParams } from "react-router-dom";
import { OrdersDetailsItem } from "../orders-details-item/orders-details-item";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderStatus } from "../../utils/constants";
import { NotFoundPage } from "../../pages/no-found-page/not-found-page";
import PropTypes from 'prop-types';
import { getCost, getTextTime } from "../../utils/functions";
import { useSelector } from "../../types/hooks";
import { TIngredient, TIngredientsArray, TOrderFeed } from "../../types/types";
import { TOrderStatus } from "../../types/types";

export const OrdersDetails = ({ center = false }:{center?:boolean}) => {
    const orders = useSelector(store => store.ws.orders.orders);
    const id = useParams().id;
    const listIngredients = useSelector(store => store.listIngredients.ingredients);
    if (orders === undefined) return <></>
    const order = orders.find((order:TOrderFeed) => order._id === id)
    if (!order) return <NotFoundPage />
    const { name, number, status, ingredients, updatedAt } = order

    const arrayIngredients:TIngredientsArray = [];
    ingredients.forEach((ingredient:string) => {
        if (ingredient !== null) {
            arrayIngredients.push(listIngredients.find((el:TIngredient) => el._id === ingredient)!) 
        }
    });

    return (
        <div className={styles.popup_content}>
            <p className={`text text_type_digits-default ${center && styles.center}`}>{`#${number}`}</p>
            <h1 className={`text text_type_main-medium ${styles.title}`}>{name}</h1>
            <p className={`text text_type_main-default ${styles.status}`}>{orderStatus[status as  keyof TOrderStatus]}</p>
            <h2 className="text text_type_main-medium">Состав:</h2>
            <ul className={`${styles.list} ${styles.scrollbar}`}>
                {
                    arrayIngredients.map((ingredient, index) => {
                        return <OrdersDetailsItem ingredient={ingredient} key={index} />
                    })
                }
            </ul>
            <div className={styles.date_cost}>
                <p className={`text text_type_main-default ${styles.date}`}>
                    {getTextTime(updatedAt)}
                </p>
                <div className={styles.cost}>
                    <p className="text text_type_digits-default">{getCost(arrayIngredients)}</p>
                    <CurrencyIcon type="primary" />
                </div>

            </div>

        </div>
    )
}

OrdersDetails.propTypes = {
    center: PropTypes.bool,
}