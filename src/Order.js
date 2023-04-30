import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";

function Order({ order }) {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM DD YYYY,h:mna")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      <CurrencyFormat
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        renderText={(value) => (
          <>
            <h3>Order Total : {value}</h3>
          </>
        )}
      />
    </div>
  );
}

export default Order;
