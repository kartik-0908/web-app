"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AuthWrapper from "../AuthWrapper";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { z } from 'zod';
import axios from "axios";


const Knowledge = () => {
  const [faqurl, setFaqUrl] = useState("");
  const [currentfaqurl, setcurrentfaqurl] = useState("");
  const [termsurl, settermsUrl] = useState("");
  const [currenttermsurl, setcurrenttermsurl] = useState("");
  const [helpurl, sethelpUrl] = useState("");
  const [currenthelpurl, setcurrenthelpurl] = useState("");
  const [showFaqConfirmation, setShowFaqConfirmation] = useState(false);
  const [showFaqDel, setShowFaqDel] = useState(false);
  const [showTermsConfirmation, setShowTermsConfirmation] = useState(false);
  const [showTermsDel, setShowTermsDel] = useState(false);
  const [showHelpConfirmation, setShowHelpConfirmation] = useState(false);
  const [showHelpDel, setShowHelpDel] = useState(false);
  const [buttonloading, setbuttonloading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: boolean }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (file) => file.type === 'text/plain' || file.type === 'application/pdf'
    );
    if (files.length <= 10) {
      setSelectedFiles([...selectedFiles, ...files]);
    } else {
      alert('Maximum 10 files can be selected.');
    }
  };
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: true,
      }));

      await axios.post('/api/upload', formData);

      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: false,
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const getBackgroundColor = (index: number) => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-red-100', 'bg-purple-100'];
    return colors[index % colors.length];
  };
  const handleFileDelete = (file: File) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
  };
  const handleFaqUrlChange = (value: any) => {
    setFaqUrl(value);
  };
  const handleHelpUrlChange = (value: string) => {
    sethelpUrl(value);
  };
  const handleTermsUrlChange = (value: string) => {
    settermsUrl(value);
  };

  const handleDeleteFaqUrl = () => {
    setShowFaqDel(true);
  };
  const handleAddFaqUrl = () => {
    setShowFaqConfirmation(true);
  };

  const handleDeleteTermsUrl = () => {
    setShowTermsDel(true);
  };
  const handleAddTermsUrl = () => {
    setShowTermsConfirmation(true);
  };
  const handleDeleteHelpUrl = () => {
    setShowHelpDel(true);
  };
  const handleAddHelpUrl = () => {
    setShowHelpConfirmation(true);
  };
  const handleConfirmFaqDelete = async () => {
    setbuttonloading(true)
    try {
      await axios.delete("/api/v1/data/knowledge-base/faq");
      setFaqUrl("");
      setcurrentfaqurl("");
      setShowFaqDel(false);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
    setbuttonloading(false)
  };
  const handleConfirmAddFaq = async () => {
    setbuttonloading(true)

    try {
      await axios.post("/api/v1/data/knowledge-base/faq", { faqurl });
      setcurrentfaqurl(faqurl)
      setShowFaqConfirmation(false);
    } catch (error) {
      console.error("Error adding URL:", error);
    }
    setbuttonloading(false)
  };
  const handleConfirmTermsDelete = async () => {
    setbuttonloading(true)

    try {
      await axios.delete("/api/v1/data/knowledge-base/terms");
      setcurrenttermsurl("");
      settermsUrl("");
      setShowTermsDel(false);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
    setbuttonloading(false)
  };

  const handleConfirmAddTerms = async () => {
    setbuttonloading(true)

    try {
      // Send a request to the backend to add the URL to the knowledge base
      await axios.post("/api/v1/data/knowledge-base/terms", { termsurl });
      setcurrenttermsurl(termsurl)
      setShowTermsConfirmation(false);
    } catch (error) {
      console.error("Error adding URL:", error);
    }
    setbuttonloading(false)

  };
  const handleConfirmHelpDelete = async () => {
    setbuttonloading(true)

    try {
      await axios.delete("/api/v1/data/knowledge-base/help");
      sethelpUrl("");
      setcurrenthelpurl("");
      setShowHelpDel(false);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
    setbuttonloading(false)

  };
  const handleConfirmAddHelp = async () => {
    setbuttonloading(true)

    try {
      // Send a request to the backend to add the URL to the knowledge base
      await axios.post("/api/v1/data/knowledge-base/help", { helpurl });
      setcurrenthelpurl(helpurl)
      setShowHelpConfirmation(false);
    } catch (error) {
      console.error("Error adding URL:", error);
    }
    setbuttonloading(false)

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
                value={faqurl}
                onValueChange={handleFaqUrlChange}
                endContent={
                  faqurl ? ( // Check if faqurl is not empty
                    faqurl === currentfaqurl ? (
                      <button disabled={isFaqInvalid} onClick={handleDeleteFaqUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <button disabled={isFaqInvalid} onClick={handleAddFaqUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    )
                  ) : null  // Show nothing if faqurl is empty
                }

              />
              {
                showFaqConfirmation &&
                (
                  <div className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                      <p>
                        Are you sure you want to add this FAQ URL to the knowledge base?
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button
                          isLoading={buttonloading}
                          onClick={handleConfirmAddFaq} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                          Confirm
                        </Button>
                        <button onClick={() => setShowFaqConfirmation(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              {showFaqDel && (
                <div className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      Are you sure you want to delete this URL from the knowledge base?
                    </p>
                    <div className="flex justify-end mt-4">
                      <Button
                        isLoading={buttonloading}
                        onClick={handleConfirmFaqDelete} className="text-white bg-red hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </Button>
                      <button onClick={() => setShowFaqDel(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
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
                value={termsurl}
                onValueChange={handleTermsUrlChange}
                endContent={
                  termsurl ? (
                    termsurl === currenttermsurl ? (
                      <button disabled={isTermsInvalid} onClick={handleDeleteTermsUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <button disabled={isTermsInvalid} onClick={handleAddTermsUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    )
                  ) : null
                }

              />
              {showTermsConfirmation && (
                <div className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      Are you sure you want to add this Terms URL to the knowledge base?
                    </p>
                    <div className="flex justify-end mt-4">
                      <Button
                        isLoading={buttonloading}
                        onClick={handleConfirmAddTerms} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </Button>
                      <button onClick={() => setShowTermsConfirmation(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {showTermsDel && (
                <div className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      Are you sure you want to delete this Terms URL from the knowledge base?
                    </p>
                    <div className="flex justify-end mt-4">
                      <Button
                        isLoading={buttonloading}

                        onClick={handleConfirmTermsDelete} className="text-white bg-red hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </Button>
                      <button onClick={() => setShowTermsDel(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
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
                value={helpurl}
                onValueChange={handleHelpUrlChange}
                endContent={
                  helpurl ? (
                    helpurl === currenthelpurl ? (
                      <button disabled={isHelpInvalid} onClick={handleDeleteHelpUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <button disabled={isHelpInvalid} onClick={handleAddHelpUrl} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    )
                  ) : null
                }


              />
              {showHelpConfirmation && (
                <div className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      Are you sure you want to add this Help URL to the knowledge base?
                    </p>
                    <div className="flex justify-end mt-4">
                      <Button
                        isLoading={buttonloading}
                        onClick={handleConfirmAddHelp} className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </Button>
                      <button onClick={() => setShowHelpConfirmation(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {showHelpDel && (
                <div className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p>
                      Are you sure you want to delete this Help URL from the knowledge base?
                    </p>
                    <div className="flex justify-end mt-4">
                      <Button
                        isLoading={buttonloading}
                        onClick={handleConfirmHelpDelete} className="text-white bg-red hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                        Confirm
                      </Button>
                      <button onClick={() => setShowHelpDel(false)} className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
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
          <div className="flex flex-col gap-2 p-6.5">
            {selectedFiles.map((file, index) => (
              <div
                key={file.name}
                className={`flex items-center justify-between p-2 pl-4 pr-4 rounded-xl ${getBackgroundColor(index)}`}
              >
                <span>{file.name}</span>
                {uploadProgress[file.name] ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                ) : (
                  <button
                    onClick={() => handleFileDelete(file)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Attach file
              </label>
              <input
                multiple
                accept=".txt,.pdf"
                onChange={handleFileChange}
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
            <button
              onClick={() => selectedFiles.forEach(handleFileUpload)}
              className="mt-4 rounded-lg bg-primary px-5 py-3 text-white hover:bg-opacity-90"
            >
              Upload Files
            </button>
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
