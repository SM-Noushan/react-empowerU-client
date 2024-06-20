import { FloatingLabel, Textarea } from "flowbite-react";
import Lottie from "lottie-react";

import Container from "../shared/Container";
import SubmitButton from "../form/SubmitButton";
import contact from "../../assets/contact_us.json";
import SectionHeading from "../shared/SectionHeading";

const ContactUs = () => {
  return (
    <Container>
      <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center relative">
        <SectionHeading heading="Contact Us" />
        <div className="bg-white dark:bg-gray-900 w-full flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex-1">
            <Lottie animationData={contact} className="-auto" />;
          </div>
          <div className="flex-1">
            {/* contact form */}
            <div className="w-2/3 mx-auto space-y-6">
              <div>
                <FloatingLabel variant="filled" label="Name" />
              </div>
              <div>
                <FloatingLabel variant="filled" label="Email" />
              </div>
              <div>
                <Textarea
                  placeholder="Message..."
                  className="block rounded-none rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700  appearance-none dark:text-white focus:outline-none focus:ring-0 peer  border-0 border-b-2 dark:placeholder-gray-400 placeholder:text-sm focus:border-b-blue-700"
                  rows={4}
                />
              </div>
              <SubmitButton label="Submit" dependencies={{ loading: false }} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
