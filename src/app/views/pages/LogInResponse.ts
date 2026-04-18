export class LoggedInResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    usersName: string;
    emailAddress: string;
    usersGroupName: string;
    usersGroupId: number;
    remarks: string;
    usersGroupNames: string[];
    usersGroupIds: number[];
    message: string;
}
