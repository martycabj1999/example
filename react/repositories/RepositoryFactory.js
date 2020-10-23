import AuthRepository from "./authRepository";
import UserRepository from "./userRepository";

const repositories = {
  auth: AuthRepository,
  user: UserRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
