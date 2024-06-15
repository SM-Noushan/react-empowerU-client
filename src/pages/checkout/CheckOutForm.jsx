import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SubmitButton from "../../components/form/SubmitButton";

const CheckOutForm = ({ price, id, setOpenModal, setPayStatus }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (price)
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    else setClientSecret("");
  }, [axiosSecure, price]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) return;

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // confirm payment
    const { paymentIntent, error: payError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      }
    );
    if (payError) {
      console.log("pay error", error);
      //   toast.error(error.message);
    } else {
      //   console.log("[PaymentConfirm]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: user?.email,
          uid: user.uid,
          price,
          transactionId: paymentIntent.id,
          date: new Date(),
          scholarshipId: id,
          status: "paid",
        };
        const resPayDB = await axiosSecure.post("/payments", payment);
        // console.log("pay db >> ", resPayDB.data);
        if (resPayDB?.data?.insertedId) {
          setPayStatus(true);
          setOpenModal(true);
          queryClient.invalidateQueries(["myPayments"]);
          return toast.success("Payment Successful");
        }
      }
    }
  };

  return (
    <form onSubmit={handleForm}>
      <CardElement className="dark:bg-gray-400 px-3.5 py-2.5 rounded-md" />
      <div className="w-2/3 lg:w-1/2 mx-auto text-center">
        <SubmitButton
          label="Pay"
          dependencies={{ loading: !stripe, editProfile: clientSecret }}
        />
      </div>
    </form>
  );
};

CheckOutForm.propTypes = {
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  setPayStatus: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default CheckOutForm;
