import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface InterestsFormData {
  userId: string;
  preferences: string[];
}

export async function createInterests(data: InterestsFormData): Promise<void> {
  await axios.post(`${BASE_URL}/recommendations`, {
    user_id: data.userId,
    preferences: data.preferences,
  });
}

export async function getInterests(userId: string) {
  const response = await axios.get(
    `${BASE_URL}/users/${userId}/recommendations`
  );

  return response.data;
}
