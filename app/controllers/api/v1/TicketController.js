const {
  GeneralError,
  IdNotFoundError,
  MissingFieldError,
} = require('../../../errors');
class TicketController {
  constructor(ticketService, wishlistService) {
    this.ticketService = ticketService;
    this.wishlistService = wishlistService;
  };

  handleGetList = async (req, res) => {
    try {
      const tickets = await this.ticketService.list({...req.query});
      let result = [];
      if (req.user) {
        const wishlist = await this.wishlistService.listByUser(req.user.id);
        for (let i = 0; i < tickets.length; i++) {
          const ticket = tickets[i];
          const found = wishlist.find((x) => {
            return x.ticketId == ticket.dataValues.id;
          });
          result.push({...ticket.dataValues, wishlisted: !!found});
        };
      } else {
        result = tickets;
      };
      res.status(200).json({
        status: 'success',
        message: 'get ticket list data success',
        data: result,
        meta: {
          count: result.length,
        },
      });
    } catch (err) {
      console.log(err);
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleGet = async (req, res) => {
    try {
      let result;
      const ticket = await this.ticketService.get(req.params.id);
      if (!ticket) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      if (req.user) {
        const wishlist = await this.wishlistService.listByUser(req.user.id);
        const found = wishlist.find((x) => {
          return x.ticketId == ticket.dataValues.id;
        });
        result = {...ticket.dataValues, wishlisted: !!found};
      } else {
        result = ticket.dataValues;
      }
      res.status(200).json({
        status: 'success',
        message: 'get ticket data success',
        data: result,
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleCreate = async (req, res) => {
    // BUG:
    // For ONE_WAY ticket, error if returnTime empty
    // If returnTime null, return time be 1970 and not null in db
    try {
      if (
        !req.body.category ||
        !req.body.from ||
        !req.body.departureTime ||
        !req.body.price ||
        !req.body.flightNumber ||
        !req.body.duration ||
        (req.body.category == 'ROUND_TRIP' && !req.body.returnTime)
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
      } else {
        let returnTimes;
        if (req.body.category === 'ONE_WAY') {
          returnTimes = null;
        } else {
          returnTimes = new Date(req.body.returnTime).toISOString();
        }
        const ticket = await this.ticketService.create({
          ...req.body,
          createdBy: req.user.id,
          updatedBy: req.user.id,
          departureTime: new Date(req.body.departureTime).toISOString(),
          returnTime: returnTimes,
        });
        res.status(201).json({
          status: 'success',
          message: 'add ticket data success',
          data: ticket,
        });
      };
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleUpdate = async (req, res) => {
    // BUG:
    // If returnTime or departureTime empty/not updated, error
    try {
      const id = await this.ticketService.get(req.params.id);
      if (!id) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      let returnTimes;
      if (req.body.category === 'ONE_WAY') {
        returnTimes = null;
      } else {
        returnTimes = new Date(req.body.returnTime).toISOString();
      }
      let departureTimes;
      if (req.body.departureTime = null) {
        departureTimes = id.departureTime;
      } else {
        new Date(req.body.departureTime).toISOString();
      }
      await this.ticketService.update(req.params.id, {
        ...req.body,
        updatedBy: req.user.id,
        departureTime: departureTimes,
        returnTime: returnTimes,
      });
      const ticket = await this.ticketService.get(id.id);
      res.status(200).json({
        status: 'success',
        message: 'update ticket data success',
        data: ticket,
      });
    } catch (err) {
      const error = new GeneralError(err.message);
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
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };
}

module.exports = TicketController;
