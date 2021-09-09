export type UserInfo = {
  googleId: string | null;
  imageUrl: string | null;
  email: string | null;
  givenName: string | null;
};

export type GitHubUserInfo = {
  avatar_url: string | null;
  login: string | null;
};

export type AppState = {
  user: UserInfo | null;
  googleToken: string | null;
  analyses: any[];
  gitHubUser: GitHubUserInfo | null;
  gitHubToken: string | null;
};
