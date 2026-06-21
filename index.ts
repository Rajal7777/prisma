
import express from 'express';
import { prisma } from './lib/prisma';


const app = express();
app.use(express.json());


// app.use('/user', async (_, res) => {
//   const users = await prisma.user.findMany({
//     where: {
//     nationality: {
//       in: ['German', 'Indian', 'Japanese']
//     }
//     }
//  });
//   res.json(users);
// });

app.put('/user', async (_, res) => {
  const updatedUser = await prisma.user.update({
    where: {email: "john.smith@example.com" },
    data: {
      name: "Jhon Changed",
      nationality: "Findland"
    }
  });
  res.json(updatedUser);
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

