import { NextFunction, Response, Request } from "express";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { secretKey } from "..";

export function tokenValited(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
  
  if(!token) return response.status(401).send('Acesso negado');

  try {
    const payload = jsonwebtoken.verify(token, secretKey as Secret);
    const userIdFromToken = typeof payload !== 'string' && payload.username;

    if(!userIdFromToken) {
      return response.send(401).json({ message: 'Invalid token' });
    }

    request.headers['username'] = payload.username;

    return next();
  } catch(error) {
    console.error(error);
    return response.status(401).json({ message: 'Invalid token' });
  }
}