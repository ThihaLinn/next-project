interface Config {
    googleClientId:string,
    googleClientSecret:string,
    backofficeUrl:string
    spaceEndPoint:string,
    spaceAccessKeyId:string,
    spaceSecretAccessKey:string
    orderAppUrl:string
    orderApiUrl:string
}

export const config:Config = {
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
    backofficeUrl:process.env.NEXT_PUBLIC_API_BASE_URL as string,
    spaceEndPoint:process.env.SPACE_ENDPOINT as string,
    spaceAccessKeyId:process.env.SPACE_ACCESS_KEY_ID as string,
    spaceSecretAccessKey:process.env.SPACE_SECRET_ACCESS_KEY as string,
    orderAppUrl:process.env.NEXT_PUBLIC_ORDER_APP_URL as string,
    orderApiUrl:process.env.NEXT_PUBLIC_ORDER_API_APP_URL as string
}