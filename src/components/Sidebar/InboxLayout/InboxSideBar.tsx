"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Switch } from "@nextui-org/react";
import { menuItems } from "./items";
import Element from "./Card";

const InboxSidebar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <>
      <div className="no-scrollbar flex flex-col p-2  overflow-y-auto flex-grow">
        <nav className="mt-5">
          <div>
            <ul className="flex  flex-col gap-1.5">
              {menuItems.map((item, index) => (
                <li key={index} className="flex justify-start">
                  <Element link={item.link} content={item.content}>
                    {item.svg} {item.content}
                  </Element>
                </li>
              ))}
            </ul>
            <button
              className="group relative flex items-center justify-center p-2 gap-2.5 py-2  rounded-md font-medium hover:bg-graydark dark:hover:bg-meta-4 "
              onClick={onOpen}>Restrict Operator</button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                      <p>
                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Action
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Switch
              size="sm"
              defaultSelected>
              <div
                className="group relative flex items-center justify-center p-2 gap-2.5 py-2  rounded-md font-medium"
              >
                Automatic Ticket Assignment
              </div>
            </Switch>
          </div>
        </nav>
      </div>
    </>
  );
};

export default InboxSidebar;
