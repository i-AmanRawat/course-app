"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Course } from "@/store/atoms/course";
import { CourseCard } from "./courseCard";

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  const init = async () => {
    const response = await axios.get("/api/admin/courses");

    setCourses(response.data.courses);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {courses.map((c) => {
          return <CourseCard course={c} key={c._id} />;
        })}
      </div>
    </>
  );
}

export default Courses;
