
router.post('/', authenticateToken, requireRole(['CLIENT']), validateBody(createMissionSchema), (req, res, next) => {
  (req.body as any).clientId = (req as any).user.id;
  next();
}, createMission);