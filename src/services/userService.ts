import { api } from "./api";
import type { User } from "@/types";

export const userService = {
  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },

  // Create user
  createUser: async (user: Omit<User, "id">): Promise<User> => {
    const response = await api.post("/users", {
      ...user,
      id: `user-${Date.now()}`,
    });
    return response.data;
  },
};
