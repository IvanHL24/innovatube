import axios from "axios";

export const verifyRecaptcha = async (
    token: string
): Promise<boolean> => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
        throw new Error('RECAPTCHA_SECRET_KEY no está configurada');
    }

    const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
            params: {
                secret: secretKey,
                response: token
            }
        }
    );

    return response.data.success === true;
}