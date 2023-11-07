import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Card, Typography } from "@mui/material";
import { Course } from "@/store/atoms/course";

export function CourseCard({ course }: { course: Course }) {
  const router = useRouter();

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <img
        className="mb-2"
        src={course.imageLink}
        width={300}
        height={300}
        alt="Picture of course"
      />
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          className="bg-blue-500"
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/course/" + course._id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
