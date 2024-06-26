"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { showToast } from "./Toast";
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Member {
    name: string;
    role: string;
    email: string;
}

type MembersCompType = {
    memberLink: string,
    adminLink: string,
    users: {
        firstName?: string,
        lastName?: string,
        role: string,
        email: string,
        image?: string
    }[]
}

export default function MembersComponent({ memberLink, adminLink, users }: MembersCompType) {
    const [members, setMembers] = useState<Member[]>([]);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [memberToRemove, setMemberToRemove] = useState<number | null>(null);
    const [adminInviteLink, setAdminInviteLink] = useState<string>("");
    const [memberInviteLink, setMemberInviteLink] = useState<string>("");

    useEffect(() => {
        const fetchMembers = async () => {
            // console.log(memberLink)
            // console.log(adminLink)
            // console.log(users)

            if (memberLink) {
                setMemberInviteLink(`${process.env.NEXT_PUBLIC_APP_URL}/verify/invite?member=${memberLink}`)
            }
            if (adminLink) {
                setAdminInviteLink(`${process.env.NEXT_PUBLIC_APP_URL}/verify/invite?admin=${adminLink}`)
            }
            if (users) {
                let allMembers = [];
                const len = users?.length;
                for (let i = 0; i < len; i++) {
                    const name = users[i].firstName + " " + users[i].lastName;
                    allMembers.push({
                        name: name,
                        role: users[i].role,
                        email: users[i].email,
                    });
                }
                // console.log(allMembers)
                setMembers(allMembers);
            }
        };
        fetchMembers();
    }, [memberLink, adminLink, users]);

    const handleRoleChange = (index: number, newRole: string) => {
        const updatedMembers = [...members];
        updatedMembers[index].role = newRole;
        setMembers(updatedMembers);
    };

    const handleRemoveMember = (index: number) => {
        setMemberToRemove(index);
        setShowRemoveModal(true);
    };

    const confirmRemoveMember = () => {
        if (memberToRemove !== null) {
            const updatedMembers = members.filter((_, i) => i !== memberToRemove);
            setMembers(updatedMembers);
            setShowRemoveModal(false);
            setMemberToRemove(null);
        }
    };

    return (
        <div className="relative p-4">
            <div className="bg-gray-100 p-4 mb-6 rounded-md">
                <h2 className="text-lg font-medium mb-2">Invite Links</h2>
                <div className="flex items-center mb-2">
                    <Input readOnly value={adminInviteLink} className="mr-2 flex-1" />
                    <CopyToClipboard text={adminInviteLink} onCopy={() => showToast("success", "Admin invite link copied!")}>
                        <Button color="primary">Copy</Button>
                    </CopyToClipboard>
                </div>
                <div className="flex items-center">
                    <Input readOnly value={memberInviteLink} className="mr-2 flex-1" />
                    <CopyToClipboard text={memberInviteLink} onCopy={() => showToast("success", "Member invite link copied!")}>
                        <Button color="primary">Copy</Button>
                    </CopyToClipboard>
                </div>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{member.name}</td>
                                <td className="px-6 py-4">
                                    <Select
                                        defaultSelectedKeys={[member.role]}
                                        className="max-w-xs pl-4 pr-4"
                                        onChange={(e) => handleRoleChange(index, e.target.value)}
                                    >
                                        <SelectItem key="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem key="member">
                                            Member
                                        </SelectItem>
                                    </Select>
                                </td>
                                <td className="px-6 py-4">{member.email}</td>
                                <td className="px-6 py-4">
                                    <Button
                                        isDisabled={member.role === "admin"}
                                        color={member.role === "admin" ? "default" : "danger"}
                                        className={`px-4 py-2 ${member.role === "admin" ? "text-black" : "text-white hover:bg-red-700"}`}
                                        disabled={member.role === "Admin"}
                                        onClick={() => handleRemoveMember(index)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showRemoveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-5000">
                    <div className="p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                        <div className="text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Removal</h3>
                            <p className="mt-2">Are you sure you want to remove this member?</p>
                            <div className="flex justify-center space-x-4 mt-4">
                                <Button
                                    color="danger"
                                    onClick={confirmRemoveMember}
                                >
                                    Yes
                                </Button>
                                <Button
                                    onClick={() => setShowRemoveModal(false)}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
