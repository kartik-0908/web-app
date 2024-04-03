"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const items = [
  {
    key: "feature",
    label: "Feature Improvement",
  },
  {
    key: "request",
    label: "Request a Feature",
  },
  {
    key: "bugs",
    label: "Report bugs and issues",
  },
  {
    key: "dothers",
    label: "Others",
  }
];


const feature = () => {


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Feature request" />

      <div className="pl-32 pr-32 gird-cols-12">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Request a feature
            </h3>

          </div>
          <form action="#">
            <div className="p-6.5 ">
              <div className="mb-4.5 grid-cols-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  What woudl you like to see in the next version of our bot?
                </label>
                <input
                  type="text"
                  placeholder="Short descriptive text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <div className="pt-4">
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <Select
                  label="Category"
                  placeholder="Choose a category"
                  selectionMode="multiple"
                  className="pt-4"
                >
                  {items.map((items) => (
                    <SelectItem key={items.label} value={items.label}>
                      {items.label}
                    </SelectItem>
                  ))}
                </Select>


              </div>
              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Send Message
              </button>
            </div>
          </form>
        </div>


      </div>
    </DefaultLayout>
  );
};

export default feature;
