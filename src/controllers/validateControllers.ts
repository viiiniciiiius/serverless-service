import { type Request, type Response } from 'express';
import { validateCode } from '../utils/validateCode.js';

export const validateController = (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { time, code, id } = req.query;

    if (
      typeof time !== 'string' ||
      typeof code !== 'string' ||
      typeof id !== 'string'
    ) {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Os parâmetros são obrigatórios e devem ser válidos.',
      });
      return;
    }

    const hasAccess = validateCode(time, code, id);

    if (!hasAccess) {
      res.status(401).json({
        success: false,
        access: false,
        message: 'Acesso inválido ou expirado. Por favor, entre em contato por whatsapp com: (88) 9600-5555 ou (88) 9439-8308.',
      });
      return;
      
    }

    res.status(200).json({ 
      success: true,
      access: hasAccess 
    });

  } catch (error) {
    console.error('[validateController] Erro inesperado:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro interno ao processar a validação.',
    });
  }
};