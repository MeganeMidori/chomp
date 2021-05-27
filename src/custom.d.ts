module "passport-twitch-new" {
  class Strategy<T> {
    constructor(
      config: any,
      fn: (
        accessToken: string,
        refreshToken: string,
        profile: T,
        done: (err: unknown, profile: T) => void
      ) => void
    );

    authenticate(): void;
  }
}
