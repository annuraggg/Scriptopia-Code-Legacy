interface UserToken {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accountType: string;
  sessionID: string;
  iat: number;
  exp: number
}

export default UserToken;
