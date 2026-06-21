
import express from 'express';
import { prisma } from './lib/prisma';


const app = express();
app.use(express.json());


app.use('/user', async (_, res) => {
  const users = await prisma.user.findMany({
    where: {name: "John Smith"}
 });
  res.json(users);
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

