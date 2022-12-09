const mock = require('../../../../../tests/mock');
const TicketController = require('../TicketController');
const dayjs = require('dayjs');
const {IdNotFoundError, MissingFieldError} = require('../../../../errors');
const now = dayjs();

describe('TicketController', () => {
  describe('#handleGetList', () => {
    // wishlisted: false,
    // TODO: ADD wishlisted REQUIREMENTS ON WISHLIST IMPLEMENTATION
    const mockTicket1 = {
      ...mock.TICKET,
      category: 'ONE_WAY',
    };
    const mockTicket2 = {
      ...mock.TICKET,
      category: 'ONE_WAY',
      to: 'BANDUNG',
    };
    const mockTicket3 = {
      ...mock.TICKET,
      category: 'ONE_WAY',
      departureTime: now.subtract(1, 'day'),
    };
    const mockTicket4 = {
      ...mock.TICKET,
    };
    const mockTicketList = [
      mockTicket1, mockTicket2, mockTicket3, mockTicket4];

    it('should res.status(200) and return ticket list without filter',
        async () => {
          const mockRes = mock.RES;
          const mockReq = {body: {}};

          const mockTicketService = {
            list: jest.fn().mockReturnValue(mockTicketList),
          };

          const controller = new TicketController(mockTicketService);
          await controller.handleGetList(mockReq, mockRes);

          expect(mockTicketService.list).toHaveBeenCalled();
          expect(mockRes.status).toHaveBeenCalledWith(200);
          expect(mockRes.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'get ticket list data success',
            data: mockTicketList,
            meta: {
              count: mockTicketList.length,
            },
          });
        });

    it('should res.status(200) and return filtered ticket list with filter',
        async () => {
          const mockRes = mock.RES;
          const mockReq = {
            query: {
              category: 'ONE_WAY',
              from: 'JAKARTA',
              to: 'MEDAN',
              departureTime: now.add(3, 'h').toISOString(),
            },
          };

          const mockTicketService = {
            list: jest.fn().mockReturnValue(mockTicketList),
          };

          const controller = new TicketController(mockTicketService);
          await controller.handleGetList(mockReq, mockRes);

          expect(mockTicketService.list).toHaveBeenCalled();
          expect(mockRes.status).toHaveBeenCalledWith(200);
        });
  });

  describe('#handleGet', () => {
    it('should res.status(200) and return ticket data', async () => {
      const mockRes = mock.RES;
      const mockReq = {
        params: {
          id: 1,
        },
      };

      const mockTicket = mock.TICKET;
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleGet(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get ticket data success',
        data: {
          ...mockTicket,
          // wishlisted: false,
          // TODO: ADD THIS REQUIREMENTS ON WISHLIST IMPLEMENTATION
        },
      });
    });

    it('should res.status(404) if ticket id not found', async () => {
      const mockRes = mock.RES;
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleGet(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });
  });

  describe('#handleCreate', () => {
    it('should res.status(201) and return created on success', async () => {
      const mockTicket = mock.TICKET;
      const mockUser = mock.USER;
      const mockTicketReq = {
        category: mockTicket.category,
        from: mockTicket.from,
        to: mockTicket.to,
        departureTime: mockTicket.departureTime,
        returnTime: mockTicket.departureTime,
        price: mockTicket.price,
        duration: mockTicket.duration,
        flightNumber: mockTicket.flightNumber,
        imageId: mockTicket.imageId,
        imageUrl: mockTicket.imageUrl,
        description: mockTicket.description,
      };

      const mockReq = {
        user: mockUser,
        body: mockTicketReq,
      };
      const mockRes = mock.RES;

      const mockTicketService = {
        create: jest.fn().mockReturnValue(mock.TICKET),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleCreate(mockReq, mockRes);

      // expect(mockTicketService.create).toHaveBeenCalled();
      // expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'add ticket data success',
        data: mock.TICKET,
      });
    });

    it('should res.status(400) on missing required req field(s)', async () => {
      const mockReq = {
        body: {},
      };
      const mockRes = mock.RES;

      const controller = new TicketController({});
      await controller.handleCreate(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });
  });

  describe('#handleUpdate', () => {
    it('should res.status(200) and return updated success', async () => {
      const mockTicket = mock.TICKET;
      const mockUser = mock.USER;
      const mockTicketReq = {
        category: mockTicket.category,
        from: 'DA WAY',
        to: mockTicket.to,
        departureTime: mockTicket.departureTime,
        returnTime: mockTicket.departureTime,
        price: mockTicket.price,
        flightNumber: mockTicket.flightNumber,
        imageId: mockTicket.imageId,
        imageUrl: mockTicket.imageUrl,
        description: mockTicket.description,
      };

      const mockReq = {
        params: {id: 1},
        user: mockUser,
        body: mockTicketReq,
      };
      const mockRes = mock.RES;

      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
        update: jest.fn().mockReturnValue({
          ...mock.TICKET,
          from: 'DA WAY',
        }),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleUpdate(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockTicketService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'update ticket data success',
        data: {
          ...mock.TICKET,
          from: 'DA WAY',
        },
      });
    });

    it('should res.status(404) if ticket id not found', async () => {
      const mockReq = {
        params: {id: 1},
        body: {},
      };
      const mockRes = mock.RES;

      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
        update: jest.fn().mockReturnValue(null),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleUpdate(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });
  });

  describe('#handleDelete', () => {
    it('should res.status(200) on delete success', async () => {
      const mockReq = {
        params: {id: 1},
      };
      const mockRes = mock.RES;

      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
        delete: jest.fn().mockReturnValue(true),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleDelete(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockTicketService.delete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'delete ticket data success',
      });
    });

    it('should res.status(404) if ticket if not found', async () => {
      const mockRes = mock.RES;
      const mockReq = {
        params: {id: 9999},
      };

      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
        delete: jest.fn().mockReturnValue(null),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleDelete(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });
  });
});
