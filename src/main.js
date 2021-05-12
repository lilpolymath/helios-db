const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get(`/students`, async (req, res) => {
  const result = await prisma.student.findMany();
  console.log(res.json(result));
});

app.post(`/student`, async (req, res) => {
  const data = req.body;
  const result = await prisma.student.create({
    data: {
      ...data,
    },
  });
  res.json(result);
});

app.delete(`/student/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.student.delete({
    where: { id: parseInt(id) },
  });
  res.json(result);
});

app.get(`/post/:id`, async (req, res) => {
  const { slug } = req.params;
  const result = await prisma.student.findOne({
    where: { id: parseInt(id) },
  });
  res.json(result);
});

var port = process.env.PORT || 3001;

const server = app.listen(port, () =>
  console.log('🚀 Server ready at: http://localhost:' + port)
);
