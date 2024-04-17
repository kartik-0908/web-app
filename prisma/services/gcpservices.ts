import { Storage } from "@google-cloud/storage";

function generateUniqueFilename(email: string, originalFilename: string): string {
    const uniqueFilename = `${email}_logo`;
    return uniqueFilename;
}

export async function uploadLogo(file: File, email: string): Promise<string> {
    const uniqueFilename = generateUniqueFilename(email, file.name);
    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });
    const bucketName = process.env.BUCKET_NAME || "";
    const bucket = storage.bucket(bucketName);


    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const blob = bucket.file(uniqueFilename);
    await new Promise((resolve, reject) => {

        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream
            .on("error", (err) => reject(err))
            .on("finish", () => resolve(true));

        blobStream.end(buffer);
    });

    // return "hellllecnl"
    return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
}



export async function checkFileExists(email: string): Promise<boolean> {
    const bucketName = process.env.BUCKET_NAME || "";

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const bucket = storage.bucket(bucketName);

    const fileName = `${email}_logo`;
    const file = bucket.file(fileName);

    try {
        const [exists] = await file.exists();
        if (exists) {
            return true;
        }
    } catch (error) {
        console.error(`Error checking file existence for ${fileName}:`, error);
        throw error;
    }

    return false;
}


export async function deleteFileByEmail(email: string): Promise<boolean> {
    const bucketName = process.env.BUCKET_NAME || "";

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const bucket = storage.bucket(bucketName);

    const fileName = `${email}_logo`;
    const file = bucket.file(fileName);

    try {
        const [exists] = await file.exists();
        if (exists) {
            await file.delete();
            console.log(`File ${fileName} deleted successfully.`);
            return true;
        }
    } catch (error) {
        console.error(`Error deleting file ${fileName}:`, error);
        throw error;
    }

    console.log(`No file found for email ${email}.`);
    return false;
}