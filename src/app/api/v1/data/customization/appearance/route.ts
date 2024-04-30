import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { updateAppearance, updateLogo } from "../../../../../../../prisma/services/user";
import { checkFileExists, deleteFileByEmail, uploadLogo } from "../../../../../../../prisma/services/gcpservices";


export async function POST(req: Request) {
    const session = await getServerSession();
    const formData = await req.formData();
    console.log(formData)
    if (session && session.user && session.user.email) {

        try {
            const logofile = formData.get('logo') as File;
            const fontFamily = formData.get('fontFamily') as string | null;
            const fontColor = formData.get('fontColor') as string | null;
            const selectedColor = formData.get('selectedColor') as string | null;
            const widgetPosition = formData.get('widgetPosition') as string | null;
            const email = session.user.email;

            if (fontFamily && fontColor && selectedColor && widgetPosition) {
                const updateResult = await updateAppearance(email, selectedColor, fontFamily, fontColor, widgetPosition);
            }
            if (!logofile) {
                throw new Error("image not found")
            }

            if (logofile) {
                const if_already_exists = await checkFileExists(email)
                if(if_already_exists){
                    await deleteFileByEmail(email);
                }
                const logouploadresp = await uploadLogo(logofile,email)
                console.log(logouploadresp);
                if(logouploadresp){
                    await updateLogo(email, logouploadresp)
                }
            }

            return NextResponse.json({
                "data": "success full change"
            })
        } catch (e) {
            console.log(e)
        }
    }
}





