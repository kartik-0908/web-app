"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AuthWrapper from "../AuthWrapper";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { z } from 'zod';


const Knowledge = () => {
  const [faqurl, setFaqUrl] = useState("");
  const [currentfaqurl, setcurrentfaqurl] = useState("");
  const [termsurl, settermsUrl] = useState("");
  const [currenttermsurl, setcurrenttermsurl] = useState("");
  const [helpurl, sethelpUrl] = useState("");
  const [currenthelpurl, setcurrenthelpurl] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleFaqUrlChange = (e: any) => {
    setFaqUrl(e.target.value);
  };
  const handleHelpUrlChange = (e: any) => {
    sethelpUrl(e.target.value);
  };
  const handleTermsUrlChange = (e: any) => {
    settermsUrl(e.target.value);
  };

  const handleDeleteUrl = () => {
    setShowConfirmation(true);
  };
  const handleAddUrl = () => {
    setShowConfirmation(true);
  };

  const handleConfirmFaqDelete = async () => {
    try {
      await fetch("/api/deleteUrl", {
        method: "DELETE",
        body: JSON.stringify({ faqurl }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setFaqUrl("");
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };
 
  const handleConfirmAddFaq = async () => {
    try {
      // Send a request to the backend to add the URL to the knowledge base
      await fetch("/api/addUrl", {
        method: "POST",
        body: JSON.stringify({ faqurl }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error adding URL:", error);
    }
  };
  const urlSchema = z.string().url();
  const validateUrl = (value: any) => {
    try {
      urlSchema.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  const isFaqInvalid = React.useMemo(() => {
    if (faqurl === "") return false;
    return validateUrl(faqurl) ? false : true;
  }, [faqurl]);
  const isTermsInvalid = React.useMemo(() => {
    if (termsurl === "") return false;
    return validateUrl(termsurl) ? false : true;
  }, [termsurl]);
  const isHelpInvalid = React.useMemo(() => {
    if (helpurl === "") return false;
    return validateUrl(helpurl) ? false : true;
  }, [helpurl]);
  return (
    <AuthWrapper>
      <DefaultLayout>
        <Breadcrumb pageName="Knowledge Base" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Website URL
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Enter URL for FAQs
              </label>
              <Input
                type="url"
                placeholder="Enter your Url here"
                variant="bordered"
                isInvalid={isFaqInvalid}
                color={isFaqInvalid ? "danger" : "success"}
                errorMessage={isFaqInvalid && "Please enter a valid URL"}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black dark:text-white",
                    "placeholder:text-black/50 dark:placeholder:text-white/50",
                    "focus:border-red",
                    "active:border-red",
                    "disabled:cursor-default",
                    "disabled:bg-whiter",
                    "dark:border-form-strokedark",
                    "dark:bg-transparent",
                    "dark:focus:border-primary",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "border-[1.5px]",
                    "focus:border-red",
                    "px-5",
                    "py-3",
                    "outline-none",
                    "transition",
                    "bg-transparent",
                  ],
                }}
                defaultValue={currentfaqurl}
                onChange={handleFaqUrlChange}
                endContent={
                  faqurl ? ( // Check if faqurl is not empty
                    faqurl === currentfaqurl ? (
                      <button disabled={isFaqInvalid} onClick={handleDeleteUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <button disabled={isFaqInvalid} onClick={handleAddUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    )
                  ) : null  // Show nothing if faqurl is empty
                }

              />
              {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      {faqurl === currentfaqurl ? "Are you sure you want to delete this URL from the knowledge base?" :
                        "Are you sure you want to add this URL to the knowledge base?"}
                    </p>
                    <div className="flex justify-end mt-4">
                      <button onClick={faqurl === currentfaqurl ? handleConfirmFaqDelete : handleConfirmAddFaq} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </button>
                      <button onClick={() => setShowConfirmation(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Enter URL for Terms
              </label>
              <Input
                type="url"
                placeholder="Enter your Url here"
                variant="bordered"
                isInvalid={isTermsInvalid}
                color={isTermsInvalid ? "danger" : "success"}
                errorMessage={isTermsInvalid && "Please enter a valid URL"}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black dark:text-white",
                    "placeholder:text-black/50 dark:placeholder:text-white/50",
                    "focus:border-red",
                    "active:border-red",
                    "disabled:cursor-default",
                    "disabled:bg-whiter",
                    "dark:border-form-strokedark",
                    "dark:bg-transparent",
                    "dark:focus:border-primary",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "border-[1.5px]",
                    "focus:border-red",
                    "px-5",
                    "py-3",
                    "outline-none",
                    "transition",
                    "bg-transparent",
                  ],
                }}
                defaultValue={currenthelpurl}
                onChange={handleTermsUrlChange}
                endContent={
                  termsurl ? (
                    termsurl === currenttermsurl ? (
                      <button disabled={isTermsInvalid} onClick={handleDeleteUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <button disabled={isTermsInvalid} onClick={handleAddUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    )
                  ) : null
                }

              />
              {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      {faqurl === currentfaqurl ? "Are you sure you want to delete this URL from the knowledge base?" :
                        "Are you sure you want to add this URL to the knowledge base?"}
                    </p>
                    <div className="flex justify-end mt-4">
                      <button onClick={faqurl === currentfaqurl ? handleConfirmFaqDelete : handleConfirmAddFaq} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </button>
                      <button onClick={() => setShowConfirmation(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Enter URL for Help
              </label>
              <Input
                type="url"
                placeholder="Enter your Url here"
                variant="bordered"
                isInvalid={isHelpInvalid}
                color={isHelpInvalid ? "danger" : "success"}
                errorMessage={isHelpInvalid && "Please enter a valid URL"}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black dark:text-white",
                    "placeholder:text-black/50 dark:placeholder:text-white/50",
                    "focus:border-red",
                    "active:border-red",
                    "disabled:cursor-default",
                    "disabled:bg-whiter",
                    "dark:border-form-strokedark",
                    "dark:bg-transparent",
                    "dark:focus:border-primary",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "border-[1.5px]",
                    "focus:border-red",
                    "px-5",
                    "py-3",
                    "outline-none",
                    "transition",
                    "bg-transparent",
                  ],
                }}
                defaultValue={currenthelpurl}
                onChange={handleHelpUrlChange}
                endContent={
                  helpurl ? (
                    helpurl === currenthelpurl ? (
                      <button disabled={isHelpInvalid} onClick={handleDeleteUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <button disabled={isHelpInvalid} onClick={handleAddUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    )
                  ) : null
                }

              />
              {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      {faqurl === currentfaqurl ? "Are you sure you want to delete this URL from the knowledge base?" :
                        "Are you sure you want to add this URL to the knowledge base?"}
                    </p>
                    <div className="flex justify-end mt-4">
                      <button onClick={faqurl === currentfaqurl ? handleConfirmFaqDelete : handleConfirmAddFaq} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </button>
                      <button onClick={() => setShowConfirmation(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Upload a Document
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Attach file
              </label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>


        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              add a link to a video
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <input
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      </DefaultLayout>
    </AuthWrapper>
  );
};

export default Knowledge;
