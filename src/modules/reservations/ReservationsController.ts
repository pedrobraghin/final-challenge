import { GetAllReservationsService } from './GetAllReservationsService';
import { Request, Response, NextFunction } from 'express';
import { CatchExpressError } from '../../decorators/CatchExpressError';
import { InputReservationDTO } from '../../interfaces/InputReservationDTO';
import { CreateReservationService } from './CreateReservationService';
import { ReservationsRepository } from './ReservationsRepository';
import { PaginationUtils } from '../../utils/PaginationUtils';
import { DeleteReservationService } from './DeleteReservationService';
import { GetReservationByIdService } from './GetReservationByIdService';
import { UpdateReservationService } from './UpdateReservationService';

export class ReservationsController {
  @CatchExpressError
  async createReservation(req: Request, res: Response, _next: NextFunction) {
    const input: InputReservationDTO = req.body;
    const createReservationService = new CreateReservationService(
      ReservationsRepository
    );

    const { user } = req.app.locals;

    const reservation = await createReservationService.execute(input, user);

    return res.status(200).json({
      status: 'success',
      data: reservation,
    });
  }

  @CatchExpressError
  async getAllReservations(req: Request, res: Response, _next: NextFunction) {
    const limit = Number(req.query.limit) || 0;
    const offset = Number(req.query.offset) || 0;
    const { user } = req.app.locals;
    const getAllReservationsService = new GetAllReservationsService(
      ReservationsRepository
    );

    const documents = await getAllReservationsService.execute(
      user._id,
      limit,
      offset,
      req.query
    );

    const offsets = PaginationUtils.calculateOffsets(
      limit,
      documents.documentsCount
    );

    return res.status(200).json({
      status: 'success',
      results: documents.reservations.length,
      limit: limit || documents.documentsCount,
      offset,
      offsets,
      data: documents.reservations,
    });
  }

  @CatchExpressError
  async getReservationById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const getReservationByIdService = new GetReservationByIdService(
      ReservationsRepository
    );

    const reservation = await getReservationByIdService.execute(id);

    return res.status(200).json({
      status: 'success',
      data: reservation,
    });
  }

  @CatchExpressError
  async updateReservation(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const input: InputReservationDTO = req.body;
    const updateReservationService = new UpdateReservationService(
      ReservationsRepository
    );

    const updatedReservation = await updateReservationService.execute(
      id,
      input
    );

    return res.status(200).json({
      status: 'success',
      data: updatedReservation,
    });
  }

  @CatchExpressError
  async deleteReservation(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const deleteReservationService = new DeleteReservationService(
      ReservationsRepository
    );

    await deleteReservationService.execute(id);

    return res.status(204).send();
  }
}

export default new ReservationsController();
