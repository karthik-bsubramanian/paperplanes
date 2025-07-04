import { atomWithStorage } from "jotai/utils";

export type userType = {
  name: string;
  image: string;
  id: string;
};

export const userState = atomWithStorage<userType | null>("userState", null);

export type topicType = {
  topicId: Number;
}

export const topicState = atomWithStorage<topicType>("topicState",{ topicId: 1});

