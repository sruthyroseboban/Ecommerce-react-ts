import React from "react";
import { ButtonCTA } from "../../Components/ButtonCTA";
import { Product } from "../../Components/Product";
import { PageProps, ActionType } from "../../globalTypes";
import { ITotalAmount, totalAmountInitial } from "./types";

export const Cart: React.FC<PageProps> = ({ state, dispatch }): JSX.Element => {
  const { shoppingCart } = state
  const [totalAmount, setTotalAmount] = React.useState<ITotalAmount>(totalAmountInitial)

  React.useEffect(() => {
    if(shoppingCart.length) {
      let subtotal = 0;
      let taxes = 0;
      let total = 0;

      shoppingCart.forEach(product => {
        subtotal += product.price * (product.quantity as number)
        taxes += Math.round(subtotal * 0.16);
        total += Math.round(subtotal + taxes)
      })

      setTotalAmount({
        subtotal: subtotal,
        taxes: taxes,
        total: total
      })
    }
  }, [shoppingCart])

  return(
    <section className="Cart">
      {shoppingCart.length ? (
        <section className="Cart__content">
          <article className="Cart__products">
            {shoppingCart.map(product => (
              <Product 
                key={product.id} 
                title={product.title}
                price={product.price}
                quantity={product.quantity as number}
                img={product.image}
                dispatch={dispatch as React.Dispatch<ActionType>}
                id={product.id}
              />
            ))}
          </article>

          <article className="Cart__info">
            <div className="Cart__total">
              <div className="Cart__total--subtotal">
                <h2>Subtotal</h2>
                <span>${totalAmount.subtotal}</span>
              </div>

              <div className="Cart__total--subtotal">
                <h2>Taxes</h2>
                <span>${totalAmount.taxes}</span>
              </div>

              <div className="Cart__total--total">
                <h2>Total</h2>
                <span>${totalAmount.total}</span>
              </div>
            </div>

            <ButtonCTA content="Proceed to Checkout" />
          </article>
        </section>
      ) : (
        <span className="Cart__msg">The cart is empty</span>
      )}
    </section>
  )
}