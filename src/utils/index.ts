export enum userActionsEnum {
    POST='created',
    GET='viewed',
    PUT='updated',
    DELETE='deleted'
}


export const logUserAction = (userIdentification: string, userAction: userActionsEnum, passIdentification: string) :void => {
    const date: Date = new Date();
    console.log(`[${date.toISOString()}] - User: '${userIdentification}' ${userAction} password '${passIdentification}'`);
}

export const logError = (error: any) :void => {
    const date: Date = new Date();
    console.log(`[${date}] - Error: \n ${error}`);
}

export const getOwnerFromSession = (req: any): number => {
    return  req.session.passport.user.email;
}