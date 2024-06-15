import { Navigate, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { Button } from "flowbite-react";
import { useState } from "react";

import CheckOutForm from "./CheckOutForm";
import Container2 from "../../components/shared/Container2";
import SectionHeading from "../../components/shared/SectionHeading";
import ApplicationFormModal from "../../components/ApplicationFormModal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckOut = () => {
  const { state } = useLocation();
  const data = state?.data || {};

  const [payStatus, setPayStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { _id, applicationFee, serviceCharge } = data;

  if (!Object.keys(data).length) return <Navigate to={"/"} />;
  return (
    <Container2>
      <Helmet>
        <title>EmpowerU: Apply Scholarship</title>
      </Helmet>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <SectionHeading heading="Pay & Proceed" />
        <div className="w-2/3 lg:w-1/2 mx-auto *:space-y-6">
          <Elements stripe={stripePromise}>
            <CheckOutForm
              price={applicationFee + serviceCharge}
              id={_id}
              setPayStatus={setPayStatus}
              setOpenModal={setOpenModal}
            />
            <Button
              onClick={() => setOpenModal(true)}
              className="w-2/3 lg:w-1/2 mx-auto py-0 mt-6"
              disabled={!payStatus}
            >
              Application Form
            </Button>
          </Elements>
        </div>
      </div>
      <div className="w-1/2 mx-auto *:space-y-6">
        <ApplicationFormModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={data}
          setPayStatus={setPayStatus}
        />
      </div>
    </Container2>
  );
};

export default CheckOut;
