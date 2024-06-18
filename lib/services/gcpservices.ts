// import { Storage } from "@google-cloud/storage";
// import { getLogoFileName, getShop } from "./user";
// import { createHash } from 'crypto';



// export async function uploadLogo(file: File, email: string): Promise<string> {
//     console.log(file.name)
//     const hash = createHash('md5');
//     const fileBuffer = await file.arrayBuffer();
//     hash.update(Buffer.from(fileBuffer));
//     const md5Hash = hash.digest('hex');
//     const uniqueFilename = md5Hash;
//     console.log(uniqueFilename)

//     const storage = new Storage({
//         projectId: process.env.PROJECT_ID,
//         credentials: {
//             client_email: process.env.CLIENT_EMAIL,
//             private_key: process.env.PRIVATE_KEY,
//         },
//     });
//     const bucketName = process.env.LOGO_BUCKET_NAME || "";
//     const bucket = storage.bucket(bucketName);


//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const blob = bucket.file(uniqueFilename);
//     await new Promise((resolve, reject) => {

//         const blobStream = blob.createWriteStream({
//             resumable: false,
//             metadata: {
//                 cacheControl: 'no-cache',
//             },
//         });

//         blobStream
//             .on("error", (err) => reject(err))
//             .on("finish", () => resolve(true));

//         blobStream.end(buffer);
//     });

//     return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
// }

// export async function checkFileExists(email: string): Promise<boolean> {
//     const bucketName = process.env.LOGO_BUCKET_NAME || "";
//     const fileName = await getLogoFileName(email) ;
//     console.log(fileName)
//     console.log("fileName")

//     const storage = new Storage({
//         projectId: process.env.PROJECT_ID,
//         credentials: {
//             client_email: process.env.CLIENT_EMAIL,
//             private_key: process.env.PRIVATE_KEY,
//         },
//     });

//     const bucket = storage.bucket(bucketName);

//     const file = bucket.file(fileName);

//     try {
//         const [exists] = await file.exists();
//         if (exists) {
//             return true;
//         }
//     } catch (error) {
//         console.error(`Error checking file existence for ${fileName}:`, error);
//         throw error;
//     }

//     return false;
// }


// export async function deleteFileByEmail(email: string): Promise<boolean> {
//     const bucketName = process.env.LOGO_BUCKET_NAME || "";

//     const storage = new Storage({
//         projectId: process.env.PROJECT_ID,
//         credentials: {
//             client_email: process.env.CLIENT_EMAIL,
//             private_key: process.env.PRIVATE_KEY,
//         },
//     });

//     const bucket = storage.bucket(bucketName);
//     const fileName = await getLogoFileName(email) || ""
//     const file = bucket.file(fileName);

//     try {
//         const [exists] = await file.exists();
//         if (exists) {
//             await file.delete();
//             console.log(`File ${fileName} deleted successfully.`);
//             return true;
//         }
//     } catch (error) {
//         console.error(`Error deleting file ${fileName}:`, error);
//         throw error;
//     }

//     console.log(`No file found for email ${email}.`);
//     return false;
// }

// export async function uploadFileToFolder(file: File,  folderName: string): Promise<string> {
//     const bucketName = process.env.FILES_BUCKET_NAME || "";
//     const storage = new Storage({
//         projectId: process.env.PROJECT_ID,
//         credentials: {
//             client_email: process.env.CLIENT_EMAIL,
//             private_key: process.env.PRIVATE_KEY,
//         },
//     });
//     const bucket = storage.bucket(bucketName);
//     const uniqueFilename = `${folderName}/${file.name}`;

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const blob = bucket.file(uniqueFilename);

//     await new Promise((resolve, reject) => {
//         const blobStream = blob.createWriteStream({
//             resumable: false,
//             metadata: {
//                 cacheControl: 'no-cache',
//             },
//         });

//         blobStream
//             .on("error", (err) => reject(err))
//             .on("finish", () => resolve(true));

//         blobStream.end(buffer);
//     });

//     return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
// }

// export async function deleteFileFromFolder(folderName: string, fileName: string): Promise<boolean> {
//     const bucketName = process.env.FILES_BUCKET_NAME || "";
//     const storage = new Storage({
//         projectId: process.env.PROJECT_ID,
//         credentials: {
//             client_email: process.env.CLIENT_EMAIL,
//             private_key: process.env.PRIVATE_KEY,
//         },
//     });
//     const bucket = storage.bucket(bucketName);
//     const filePath = `${folderName}/${fileName}`;
//     const file = bucket.file(filePath);

//     try {
//         const [exists] = await file.exists();
//         if (exists) {
//             await file.delete();
//             console.log(`File ${filePath} deleted successfully.`);
//             return true;
//         }
//     } catch (error) {
//         console.error(`Error deleting file ${filePath}:`, error);
//         throw error;
//     }

//     console.log(`No file found for ${filePath}.`);
//     return false;
// }
