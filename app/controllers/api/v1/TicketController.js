const {
  GeneralError,
  IdNotFoundError,
  MissingFieldError,
} = require('../../../errors');
class TicketController {
  constructor(ticketService) {
    this.ticketService = ticketService;
  };

  handleGetList = async (req, res) => {
    try {
      const ticket = await this.ticketService.list({...req.query});
      res.status(200).json({
        status: 'success',
        message: 'get ticket list data success',
        data: ticket,
        meta: {
          count: ticket.length,
        },
      });
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };

  handleGet = async (req, res) => {
    try {
      const ticket = await this.ticketService.get(req.params.id);
      if (!ticket) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      res.status(200).json({
        status: 'success',
        message: 'get ticket data success',
        data: ticket,
      });
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };

  handleCreate = async (req, res) => {
    try {
      if (
        !req.body.category ||
        !req.body.from ||
        !req.body.departureTime ||
        !req.body.price ||
        !req.body.flightNumber ||
        (req.body.category == 'ROUND_TRIP' && !req.body.returnTime)
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
      } else {
        const ticket = await this.ticketService.create({
          ...req.body,
          departureTime: new Date(req.body.departureTime),
          returnTime: new Date(req.body.returnTime),
        });
        res.status(201).json({
          status: 'success',
          message: 'add ticket data success',
          data: ticket,
        });
      };
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };

  handleUpdate = async (req, res) => {
    try {
      const id = await this.ticketService.get(req.params.id);
      if (!id) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }

      if (
        !req.body.category ||
        !req.body.from ||
        !req.body.departureTime ||
        !req.body.price ||
        !req.body.flightNumber ||
        (req.body.category == 'ROUND_TRIP' && !req.body.returnTime)
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
      } else {
        const ticket = await this.ticketService.update(req.params.id, {
          ...req.body,
          departureTime: new Date(req.body.departureTime),
          returnTime: new Date(req.body.returnTime),
        });
        res.status(200).json({
          status: 'success',
          message: 'update ticket data success',
          data: ticket,
        });
      };
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };

  handleDelete = async (req, res) => {
    try {
      const id = await this.ticketService.get(req.params.id);
      if (id) {
        await this.ticketService.delete(req.params.id);
        res.status(200).json({
          status: 'success',
          message: 'delete ticket data success',
        });
        return;
      } else {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
      }
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };
}

module.exports = TicketController;
