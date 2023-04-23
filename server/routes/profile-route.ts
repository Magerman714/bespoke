import express, { Router } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import session from 'express-session';

const prisma = new PrismaClient();
const profileRouter: Router = express.Router();

profileRouter.get('/user', async (req: Request, res: Response) => {
  // console.log(req.body.user, ' hello');
  // res.send('hello world');
  // try {
  //   const userName = await prisma.user.findUnique({
  //     where: {
  //       email:
  //     }
  //   })
  // }
});

profileRouter.get('/calories', (req, res) => {
  // console.log(req.body)
});

// Creates new user weight with POST. Updates any current weight value //
profileRouter.post('/weight', async (req: Request, res: Response) => {
  try {
    const { weight } = req.body;
    const {
      id,
      email,
      name,
      thumbnail,
      favAddresses,
      homeAddress,
      location_lat,
      location_lng,
    } = (req.user as User) || {};

    const userData: User = {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      homeAddress,
      location_lat,
      location_lng,
    };

    const updateWeight = await prisma.user.upsert({
      where: {
        id: id,
      },
      update: {
        weight: weight,
      },
      create: {
        ...userData,
        weight: weight,
      },
    });
    res.status(201).send(updateWeight);
  } catch (err) {
    console.log('Failed to update weight', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/weight', async (req: Request, res: Response) => {
  try {
    const { id } = (req.user as User) || {};
    // const { id, email, name, thumbnail } = (req.user as User) || {};
    const weightValue = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).send(weightValue);
  } catch (err) {
    console.log('Failed to get weight', err);
    res.sendStatus(500);
  }
});

profileRouter.post('/address', async (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    const {
      id,
      email,
      name,
      thumbnail,
      favAddresses,
      homeAddress,
      weight,
      location_lat,
      location_lng,
    } = (req.user as User) || {};

    const userData: User = {
      id,
      email,
      name,
      thumbnail,
      weight,
      favAddresses,
      homeAddress,
      location_lat,
      location_lng,
    };

    const updateAddress = await prisma.user.upsert({
      where: {
        id: id,
      },
      update: {
        homeAddress: address,
      },
      create: {
        ...userData,
        homeAddress: address,
      },
    });
    res.status(201).send(updateAddress);
  } catch (err) {
    console.log('Failed to update address', err);
    res.sendStatus(500);
  }
});

profileRouter.get('/address', async (req: Request, res: Response) => {
  try {
    const { id } = (req.user as User) || {};
    // const { id, email, name, thumbnail } = (req.user as User) || {};
    const address = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).send(address);
  } catch (err) {
    console.log('Failed to get address', err);
    res.sendStatus(500);
  }
});

export default profileRouter;
