"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ColorPicker from "./ColorPicker";
import { Textarea } from "@nextui-org/react";

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

const TablesPage = () => {
  const [selected, setSelected] = React.useState("appearance");
  const colors = ['#4F46E5', '#EC4899', '#22C55E', '#F59E0B', '#EF4444', '#6366F1'];

  const handleColorSelect = (color: string) => {
    console.log('Selected color:', color);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customizations" />
      <div className="grid grid-cols-12">
        <div className="flex flex-col w-full col-span-7">
          <Card className="max-w-full ">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
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
                            variant={variant}
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
                            variant={variant}
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

      </div>




    </DefaultLayout>
  );
};

export default TablesPage;
