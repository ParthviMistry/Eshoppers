import React from "react";
import { useRouter } from "next/router";
import Close from "../Icons/Close";
import { Button } from "primereact/button";

const SuccessModal = ({ showSuceessModal, setShowSuceessModal }) => {
  const router = useRouter();

  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className="fixed z-50  w-full p-4 overflow-x-hidden overflow-y-auto flex justify-center items-center h-modal md:h-full bg-gray-900 bg-opacity-25"
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <Button
              type="Button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => setShowSuceessModal(!showSuceessModal)}
            >
              <Close />
            </Button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Payment sucessful
              </h3>
              <p className="mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <Button
                label="Go to the dashboard"
                onClick={() => {
                  setShowSuceessModal(false);
                  router.push("/");
                }}
                className="w-full text-white bg-slate-900 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-600 dark:focus:ring-slate-700"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
