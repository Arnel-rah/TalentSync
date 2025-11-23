import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { RegisterRequest, LoginRequest } from '../schemas/zod';

const prisma = new PrismaClient();

export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  try {
    const { email, password, role } = req.body;
    // TODO: Vérifie si user existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ statusCode: 400, message: 'Email déjà utilisé', error: 'Conflict' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
      select: { id: true, email: true, role: true },
    });

    const accessToken = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '7d' });

    res.status(201).json({
      access_token: accessToken,
      refresh_token: refreshToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Erreur serveur', error: 'Internal Error' });
  }
};

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ statusCode: 401, message: 'Identifiants incorrects', error: 'Unauthorized' });
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '7d' });

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Erreur serveur', error: 'Internal Error' });
  }
};