import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateMissionRequest } from '../schemas/zod';

const prisma = new PrismaClient();

export const createMission = async (req: Request<{}, {}, CreateMissionRequest & { clientId: string }>, res: Response) => {  // Ajoute clientId via middleware
  try {
    const { title, description, budget, skills } = req.body;
    const mission = await prisma.mission.create({
          // TODO: req.user!.id
      data: { title, description, budget, skills, clientId: req.body.clientId },
      include: { client: true }, 
    });
    res.status(201).json(mission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Erreur création mission', error: 'Internal Error' });
  }
};

export const getMissions = async (req: Request, res: Response) => {
  try {
    const { skills, budgetMin } = req.query;
    const where: any = { status: 'OPEN' };
    if (skills) where.skills = { has: skills as string };
    if (budgetMin) where.budget = { gte: parseInt(budgetMin as string) };

    const missions = await prisma.mission.findMany({
      where,
      include: { client: { select: { id: true, email: true } } },
    });
    res.json(missions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Erreur liste missions', error: 'Internal Error' });
  }
};