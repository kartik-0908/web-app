// const { EmailClient } = require("@azure/communication-email");

// export async function sendEmail(receipentAddress: string, verificationLink: string) {
//     const connectionString = process.env.AZURE_COMMUNICATION_SERVICE;
//     const client = new EmailClient(connectionString);

//     async function main() {
//         const emailMessage = {
//             senderAddress: "DoNotReply@yugaa.tech",
//             content: {
//                 subject: "Welcome to Yugaa! Verify Your Email",
//                 html: `
//                     <html>
//                     <body>
//                         <h1>Welcome to Yugaa Tech!</h1>
//                         <p>Thank you for signing up. Please click the link below to verify your email address:</p>
//                         <p><a href="${verificationLink}">Verify Email</a></p>
//                         <p>If you did not sign up for this account, please ignore this email.</p>
//                         <p>Best regards,<br/>The Yugaa Team</p>
//                     </body>
//                     </html>
//                 `,
//                 plainText: `
//                     Welcome to Yugaa Tech!

//                     Thank you for signing up. Please click the link below to verify your email address:
//                     ${verificationLink}

//                     If you did not sign up for this account, please ignore this email.

//                     Best regards,
//                     The Yugaa Tech Team
//                 `,
//             },
//             recipients: {
//                 to: [{ address: receipentAddress }],
//             },
//         };

//         const poller = await client.beginSend(emailMessage);
//         const result = await poller.pollUntilDone();
//         console.log(result);
//     }

//     main().catch(console.error);
// }

// export async function sendEmailInvitation(recipientAddress: string, invitationLink: string) {
//     const connectionString = process.env.AZURE_COMMUNICATION_SERVICE;
//     const client = new EmailClient(connectionString);

//     const emailMessage = {
//         senderAddress: "DoNotReply@yugaa.tech",
//         content: {
//             subject: "Yugaa Invitation: Join Our Platform",
//             html: `
//                 <html>
//                 <body>
//                     <h1>You're Invited to Join Yugaa Tech!</h1>
//                     <p>We are excited to invite you to join our platform. Please click the link below to accept the invitation:</p>
//                     <p><a href="${invitationLink}">Accept Invitation</a></p>
//                     <p>If you did not expect this invitation, please ignore this email.</p>
//                     <p>Best regards,<br/>The Yugaa Team</p>
//                 </body>
//                 </html>
//             `,
//             plainText: `
//                 You're Invited to Join Yugaa Tech!

//                 We are excited to invite you to join our platform. Please click the link below to accept the invitation:
//                 ${invitationLink}

//                 If you did not expect this invitation, please ignore this email.

//                 Best regards,
//                 The Yugaa Team
//             `,
//         },
//         recipients: {
//             to: [{ address: recipientAddress }],
//         },
//     };

//     try {
//         const poller = await client.beginSend(emailMessage);
//         const result = await poller.pollUntilDone();
//         console.log(result);
//         return result;
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error;
//     }
// }