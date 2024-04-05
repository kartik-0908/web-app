"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ColorPicker from "./ColorPicker";
import { Textarea } from "@nextui-org/react";
import Image from "next/image";
import { SearchIcon } from "./SearchIcon";

const animals = [
  { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
  { label: "Dog", value: "dog", description: "The most popular pet in the world" },
  { label: "Elephant", value: "elephant", description: "The largest land animal" },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
];

const color = [
  { label: "White", value: "white" },
  { label: "Dark", value: "dark" },
]

const variants = ["flat"];

const demo_mssgs = [
  "Hi There, How May I help you?",
  "Can you give me the brief about the latest discounts on the A387 Headset"
]

const TablesPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<string[]>(demo_mssgs);
  const [selected, setSelected] = React.useState("appearance");
  const colors = ['#4F46E5', '#EC4899', '#22C55E', '#F59E0B', '#EF4444', '#6366F1'];

  const handleColorSelect = (color: string) => {
    console.log('Selected color:', color);
  };
  const handleSelectionChange = (key: React.Key) => {
    // Assuming `key` can be directly used as a string. If not, you might need to convert or handle it differently.
    setSelected(String(key)); // Converts `key` to a string if it's not already one.
  };
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("inseide sendmesage")
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customizations" />
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col w-full col-span-7">
          <Card className="max-w-full ">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={handleSelectionChange}
              >
                <Tab key="appearance" title="Appearance">
                  <form className="flex flex-col gap-4">
                    <div className="pb-4">
                      Choose Color
                    </div>
                    <div className="pl-4" >
                      <ColorPicker colors={colors} onSelect={handleColorSelect} />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="pt-4" >
                        Font Settings
                      </div>
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select
                            variant="flat"
                            label="Font Family"
                            className="max-w-xs"
                          >
                            {animals.map((animal) => (
                              <SelectItem key={animal.value} value={animal.value}>
                                {animal.label}
                              </SelectItem>
                            ))}
                          </Select>
                          <Select
                            variant="flat"
                            label="Font Color"
                            className="max-w-xs"
                          >
                            {color.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      ))}
                      <h3 className="font-medium text-black dark:text-white">
                        Upload Logo
                      </h3>
                      <div className="flex flex-col gap-5.5 p-2">
                        <div>
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Attach file
                          </label>
                          <input
                            type="file"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                          />
                          <div className="p-2">
                            <p>Logo Dimension : ...........</p>
                            <p>Supported Format: JPG,PNG,SVG</p>
                          </div>

                        </div>

                      </div>
                    </div>
                    <RadioGroup
                      label="Widget Psotion"
                      orientation="horizontal"
                    >
                      <Radio value="buenos-aires">Left</Radio>
                      <Radio value="sydney">Right</Radio>
                    </RadioGroup>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Save
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="greetings" title="Custom Greetings">
                  <form className="flex flex-col gap-4 h-[300px]">
                    <Input label="Bot name" placeholder="Name of your Bot" type="password" />
                    <Textarea
                      label="Greeting Message"
                      placeholder="Hello there ! I'm ...your name"
                    />
                    <div className="flex justify-end">
                      <Button fullWidth color="primary">
                        Save
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="language" title="Language">
                  <form className="flex flex-col gap-4 ">
                    <Textarea
                      label="Tone and Style"
                      placeholder="Conversational and friendly, with a touch of humor when appropriate. Maintain a professional tone for business-related queries."
                    />
                    <Textarea
                      label="User Guidance"
                      placeholder="Provide clear guidance and instructions. Clearly instruct users on how to navigate the chatbot, ask for information, or perform specific actions."
                    />
                    <Textarea
                      label="Positive reinforcement"
                      placeholder="Include positive phrases to acknowledge user inputs. Express gratitude and provide positive feedback where applicable to enhance user experience."
                    />
                    <Textarea
                      label="Error Handling"
                      placeholder="Clearly communicate errors with user-friendly messages. Provide suggestions for correction and avoid technical jargon. Apologize when necessary."
                    />
                    <Textarea
                      label="Politeness"
                      placeholder="Always use polite phrases and courteous language. Avoid language that may be perceived as rude or insensitive. Thank users for their inputs."
                    />
                    <Textarea
                      label="Clarity and simplicity"
                      placeholder="Prioritize straightforward language. Avoid complex jargon and use concise sentences. Break down information into easily digestible chunks."
                    />
                    <Textarea
                      label="Personalization"
                      placeholder="Address users by name whenever possible. Reference past interactions to create a personalized experience. Use personalized greetings based on user history."
                    />
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Sign up
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="behavioral" title="Behavioral Theme">
                  <form className="flex flex-col gap-4 ">
                    <div>
                      <h1>Response Length</h1>
                    </div>
                    <Tabs key="bordered" variant="bordered" aria-label="Tabs variants">
                      <Tab key="short" title="Short" />
                      <Tab key="Medium" title="Medium" />
                      <Tab key="Long" title="Long" />
                    </Tabs>
                    <Textarea
                      label="Clarification Prompt"
                      placeholder=""
                    />
                    <Textarea
                      label="Apology and Retry Attempt"
                      placeholder=""
                    />
                    <div>
                      <h1>Error Message Style</h1>
                    </div>
                    <Tabs key="bordered" variant="bordered" aria-label="Tabs variants">
                      <Tab key="Humorous" title="Humorous" />
                      <Tab key="Standard" title="Standard" />
                      <Tab key="Casual" title="Casual" />
                      <Tab key="Formal" title="Formal" />
                      <Tab key="Empathetic" title="Empathetic" />
                    </Tabs>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Save
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col  col-span-5 max-w-[400px]">
          <div className="max-w-full h-[500px] bg-white rounded-2xl">
            <div className="h-[75px] grid grid-cols-8 bg-black items-center rounded-t-2xl">
              <div className="bg-black col-span-2 rounded-full">
                <svg width="84" height="50" viewBox="0 0 256 256" xmlSpace="preserve">
                  <g
                    style={{
                      stroke: 'none',
                      strokeWidth: 0,
                      strokeDasharray: 'none',
                      strokeLinecap: 'butt',
                      strokeLinejoin: 'miter',
                      strokeMiterlimit: 10,
                      fill: 'none',
                      fillRule: 'nonzero',
                      opacity: 1,
                    }}
                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                  >
                    <path
                      d="M 90 45 C 90 20.187 69.813 0 45 0 C 20.187 0 0 20.187 0 45 c 0 13.712 6.172 26.002 15.875 34.263 c 0.036 0.035 0.058 0.079 0.097 0.112 c 0.686 0.58 1.394 1.13 2.111 1.665 c 0.01 0.008 0.02 0.015 0.03 0.022 c 0.536 0.4 1.08 0.787 1.632 1.161 c 0.089 0.06 0.178 0.119 0.267 0.179 c 0.467 0.312 0.94 0.616 1.417 0.91 c 0.166 0.102 0.331 0.204 0.498 0.304 c 0.396 0.237 0.796 0.466 1.199 0.69 c 0.242 0.135 0.484 0.271 0.729 0.402 c 0.315 0.168 0.634 0.329 0.953 0.489 c 0.329 0.166 0.656 0.332 0.99 0.49 c 0.199 0.094 0.401 0.181 0.601 0.272 c 2.208 1.007 4.508 1.843 6.889 2.485 c 0 0 0 0 0 0 c 0.547 0.148 1.1 0.281 1.655 0.408 c 0.127 0.029 0.254 0.06 0.381 0.088 c 0.49 0.108 0.983 0.205 1.478 0.297 c 0.209 0.039 0.417 0.076 0.627 0.112 c 0.44 0.075 0.882 0.144 1.326 0.206 c 0.288 0.041 0.577 0.075 0.866 0.11 c 0.385 0.046 0.77 0.092 1.157 0.128 c 0.392 0.037 0.786 0.063 1.18 0.09 c 0.301 0.02 0.6 0.046 0.902 0.06 C 43.572 89.98 44.285 90 45 90 s 1.428 -0.02 2.139 -0.054 c 0.302 -0.014 0.601 -0.04 0.902 -0.06 c 0.394 -0.027 0.788 -0.053 1.18 -0.09 c 0.388 -0.036 0.772 -0.082 1.157 -0.128 c 0.289 -0.035 0.578 -0.07 0.867 -0.11 c 0.444 -0.062 0.885 -0.131 1.325 -0.206 c 0.21 -0.036 0.419 -0.074 0.627 -0.112 c 0.495 -0.092 0.988 -0.189 1.477 -0.297 c 0.128 -0.028 0.255 -0.059 0.383 -0.089 c 0.555 -0.127 1.107 -0.26 1.654 -0.408 c 0.001 0 0.002 -0.001 0.003 -0.001 c 2.381 -0.643 4.682 -1.479 6.89 -2.486 c 0.199 -0.09 0.399 -0.177 0.597 -0.27 c 0.335 -0.159 0.664 -0.326 0.994 -0.492 c 0.317 -0.159 0.634 -0.319 0.947 -0.486 c 0.247 -0.132 0.491 -0.269 0.736 -0.405 c 0.401 -0.223 0.799 -0.451 1.193 -0.687 c 0.169 -0.101 0.336 -0.203 0.503 -0.307 c 0.476 -0.293 0.946 -0.595 1.412 -0.906 c 0.091 -0.061 0.182 -0.121 0.273 -0.183 c 0.549 -0.373 1.09 -0.758 1.624 -1.156 c 0.013 -0.01 0.026 -0.019 0.038 -0.028 c 0.716 -0.535 1.422 -1.084 2.108 -1.663 c 0.039 -0.033 0.061 -0.077 0.097 -0.112 C 83.828 71.003 90 58.712 90 45 z M 4 45 C 4 22.393 22.393 4 45 4 s 41 18.393 41 41 c 0 11.569 -4.824 22.027 -12.558 29.488 c -3.802 -7.754 -10.635 -13.575 -18.698 -16.212 c 6.58 -3.502 11.074 -10.425 11.074 -18.383 c 0 -11.479 -9.339 -20.818 -20.817 -20.818 c -11.479 0 -20.818 9.339 -20.818 20.818 c 0 7.959 4.494 14.882 11.074 18.384 c -8.064 2.637 -14.897 8.459 -18.698 16.213 C 8.825 67.027 4 56.569 4 45 z"
                      style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'white',
                        fillRule: 'nonzero',
                        opacity: 1,
                      }}
                    />
                  </g>
                </svg>


              </div>
              <div className="bg-transaparent col-span-5">
                <h1 className="text-white text-3xl font-bold p-4 ">
                  Anya
                </h1>
              </div>
              <div className="bg-black col-span-1">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>



              </div>
            </div>
            <div className="h-[400px] flex flex-col bg-white p-2 overflow-auto scrollbar-custom">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`pt-2 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                >
                  <Card className="max-w-[230px]">
                    <CardBody>
                      <p>{message}</p>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
            <div className="">
              <Input
                type="text"
                placeholder="Type Here ...."
                labelPlacement="outside"
                endContent={
                  <SearchIcon
                    onClick={handleSendMessage}
                  />
                }
                className="bg-transparent min-h-[50px]"
                value={newMessage}
                onChange={handleMessageChange}
              />


            </div>

          </div>
        </div>

      </div>
      <style jsx>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #F3F4F6;
        }
        .scrollbar-custom::-webkit-scrollbar {
          width: 12px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #F3F4F6;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: #4B5563;
          border-radius: 9999px;
          border: 3px solid #F3F4F6;
        }
      `}</style>
    </DefaultLayout>

  );
};

export default TablesPage;
