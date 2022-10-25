const express = require('express');
const app = express();
const port = process.env.port || 5000;
const cors = require('cors');
app.use(cors());

const categories = require('./Database/categories.json');
const coursesByCategory = require('./Database/coursesByCategory.json');
const courses = require('./Database/courses.json');

app.get('/', (req, res) => {
  res.send('Server is running...');
})

// display categories
app.get('/categories', (req, res) => {
  const displayCategories = categories.filter(c => c.isAdded === true)
  res.send(displayCategories);
})
// display top enrolled courses
app.get('/top-courses', (req, res) => {
  const topCourses = coursesByCategory?.filter(tc => tc.isAdded === false);
  res.send(topCourses);
})
// display courses by category
app.get('/category/courses/:id', (req, res) => {
  const id = req.params.id;
  const categoryCourses = coursesByCategory?.filter(cc => cc.categoryId === id && cc.isAdded === true);
  res.send(categoryCourses);
})
// display single course details
app.get('/category/course-details/:id', (req, res) => {
  const id = req.params.id;
  const singleCourseDetails = coursesByCategory?.find(scd => scd.courseId === id);
  res.send(singleCourseDetails);
})
// display courses
app.get('/courses', (req, res) => {
  res.send(courses);
})



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
