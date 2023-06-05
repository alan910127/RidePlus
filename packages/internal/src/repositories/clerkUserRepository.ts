import clerk, { type User as ClerkUser } from "@clerk/clerk-sdk-node";

import { type User } from "../core/domain/user";
import { type UserRepository } from "../core/ports";

const clerkUserToDomainUser = (user: ClerkUser): User => {
  return {
    id: user.id,
    name:
      user.username ??
      (user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : "Anonymous"),
    avatarUrl: user.imageUrl,
  };
};

export const createClerkUserRepository = (): UserRepository => {
  return {
    findById: async (id) => {
      const user = await clerk.users.getUser(id);
      return clerkUserToDomainUser(user);
    },
    findManyByIds: async (ids) => {
      const users = await clerk.users.getUserList({
        userId: ids,
      });
      return users.map(clerkUserToDomainUser);
    },
  };
};
