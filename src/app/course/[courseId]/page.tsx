"use client";

import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Course, courseState } from "@/store/atoms/course";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseTitle,
  coursePrice,
  isCourseLoading,
  courseImage,
} from "@/store/selectors/course";
import { Loading } from "@/components/Loading";

function UpdateCourse({ params }: { params: { courseId: string } }) {
  const courseId = params.courseId;

  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  async function getCourseData() {
    try {
      const response = await axios.get(`/api/admin/course/${courseId}`);
      console.log(response.data);
      setCourse({ isLoading: false, course: response.data.course });
    } catch (error) {
      setCourse({ isLoading: false, course: null });
    }
  }

  useEffect(() => {
    getCourseData();
  }, []);

  if (courseLoading) {
    return <Loading />;
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);

  const [title, setTitle] = useState(courseDetails.course!.title);
  const [description, setDescription] = useState(
    courseDetails.course!.description
  );
  const [image, setImage] = useState(courseDetails.course!.imageLink);
  const [price, setPrice] = useState(courseDetails.course!.price);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            variant="contained"
            className=" bg-blue-500"
            onClick={async () => {
              const updateCourseDetailsPayload = {
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price,
              };

              const response = await axios.put(
                `/api/admin/course/${courseDetails.course!._id}`,
                updateCourseDetailsPayload
              );
              console.log(response.data);
              let updatedCourse = {
                _id: courseDetails.course!._id,
                title: title,
                description: description,
                imageLink: image,
                price,
                published: true,
              };

              setCourse({ course: updatedCourse, isLoading: false });
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const price = useRecoilValue(coursePrice);
  const imageLink = useRecoilValue(courseImage);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default UpdateCourse;
