import { useActionState, useContext } from "react";
import { currencyFormatter } from "../Util/formatting";
import useHttp from "../hooks/useHttp";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import Error from "./UI/Error";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

// Configuration for submitting the order
const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

// Displays the checkout form
const Checkout = () => {
  // Access cart and UI state
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Hook for sending the order request
  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );

  // Calculate the total cart price
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  // Handles form submission
  const checkoutAction = async (prev, formData) => {
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: { items: cartCtx.items, customer: customerData },
      }),
    );
  };

  // Manage form submission state
  const [formState, formAction, isPending] = useActionState(
    checkoutAction,
    null,
  );

  // Close the checkout modal
  const handleClose = () => userProgressCtx.hideCheckout();

  // Reset UI after successful order
  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  // Default action buttons
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  // Show loading state while submitting
  if (isPending) actions = <span>Sending order data...</span>;

  // Show success message after order submission
  if (data && !error)
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      {/* Checkout form */}
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        {/* Customer details */}
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="Email" type="email" />
        <Input id="street" label="Street" type="text" />

        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>

        {/* Display request error if submission fails */}
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
