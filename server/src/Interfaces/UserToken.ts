interface UserToken {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accountType: string;
  googleId?: string;
};

export default UserToken;
