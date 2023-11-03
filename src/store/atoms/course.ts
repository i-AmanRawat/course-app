import { atom } from "recoil";

export type Course = {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageLink: string;
  published: boolean;
};

type CourseState = {
  isLoading: boolean;
  course: Course | null;
};

export const courseState = atom<CourseState>({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
