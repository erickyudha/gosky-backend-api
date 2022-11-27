const mock = require('../../../../../tests/mock');
const TicketController = require('../TicketController');
const dayjs = require('dayjs');
const {IdNotFoundError, MissingFieldError} = require('../../../../errors');
const now = dayjs();

describe('TicketController', () => {
  describe('#handleGetList', () => {
    it('should res.status(200) and return ticket list without filter',
        async () => {
          const mockRes = {...mock.RES};
          const mockReq = {body: {}};

          const mockTicketService = {
            list: jest.fn().mockReturnValue(mockTicketList),
          };

          const controller = new TicketController(mockTicketService);
          await controller.handleGetList(mockReq, mockRes);

          expect(mockTicketService.list).toBeCalled();
          expect(mockRes.status).toBeCalledWith(200);
          expect(mock.json).toBeCalledWith({
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


          const mockRes = {...mock.RES};
          const mockReq = {
            body: {
              category: 'ONE_WAY',
              from: 'JAKARTA',
              to: 'MEDAN',
              departureTime: now.add(3, 'h'),
            },
          };

          const mockTicketService = {
            list: jest.fn().mockReturnValue(mockTicketList),
          };

          const controller = new TicketController(mockTicketService);
          await controller.handleGetList(mockReq, mockRes);

          expect(mockTicketService.list).toBeCalled();
          expect(mockRes.status).toBeCalledWith(200);
          expect(mock.json).toBeCalledWith({
            status: 'success',
            message: 'get ticket list data success',
            data: [mockTicket1],
            meta: {
              count: 1,
            },
          });
        });
  });

  describe('#handleGet', () => {
    it('should res.status(200) and return ticket data', async () => {
      const mockRes = {...mock.RES};
      const mockReq = {
        params: {
          id: 1,
        },
      };

      const mockTicket = {...mock.TICKET};
      const mockTicketService = {
        get: jest.fn().mockReturnValue({...mock.TICKET}),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleGet(mockReq, mockRes);

      expect(mockTicketService.get).toBeCalled();
      expect(mockRes.status).toBeCalledWith(200);
      expect(mock.json).toBeCalledWith({
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
      const mockRes = {...mock.RES};
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

      expect(mockTicketService.get).toBeCalled();
      expect(mockRes.status).toBeCalledWith(404);
      expect(mock.json).toBeCalledWith(new IdNotFoundError().json());
    });
  });

  describe('#handleCreate', () => {
    it('should res.status(201) and return created on success', async () => {
      const mockTicket = {...mock.TICKET};
      const mockTicketReq = {
        category: mockTicket.category,
        from: mockTicket.from,
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
        body: mockTicketReq,
      };
      const mockRes = {...mock.RES};

      const mockTicketService = {
        create: jest.fn().mockReturnValue({...mock.TICKET}),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleCreate(mockReq, mockRes);

      expect(mockTicketService.create).toBeCalled();
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({
        status: 'success',
        message: 'add ticket data success',
        data: {...mock.TICKET},
      });
    });

    it('should res.status(400) on missing required req field(s)', async () => {
      const mockReq = {
        body: {},
      };
      const mockRes = {...mock.RES};

      const controller = new TicketController({});
      await controller.handleCreate(mockReq, mockRes);

      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.json).toBeCalledWith(new MissingFieldError().json());
    });
  });

  describe('#handleUpdate', () => {
    it('should res.status(200) and return updated success', async () => {
      const mockTicket = {...mock.TICKET};
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
        body: mockTicketReq,
      };
      const mockRes = {...mock.RES};

      const mockTicketService = {
        get: jest.fn().mockReturnValue({...mock.TICKET}),
        update: jest.fn().mockReturnValue({
          ...mock.TICKET,
          from: 'DA WAY',
        }),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleUpdate(mockReq, mockRes);

      expect(mockTicketService.get).toBeCalled();
      expect(mockTicketService.update).toBeCalled();
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
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
        body: {},
      };
      const mockRes = {...mock.RES};

      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
        update: jest.fn().mockReturnValue(null),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleUpdate(mockReq, mockRes);

      expect(mockTicketService.update).toBeCalled();
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith(new IdNotFoundError().json());
    });
  });

  describe('#handleDelete', () => {
    it('should res.status(200) on delete success', async () => {
      const mockRes = {...mock.RES};

      const mockTicketService = {
        get: jest.fn().mockReturnValue({...mock.TICKET}),
        delete: jest.fn().mockReturnValue(true),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleDelete({}, mockRes);

      expect(mockTicketService.get).toBeCalled();
      expect(mockTicketService.delete).toBeCalled();
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 'success',
        message: 'delete ticket data success',
      });
    });

    it('should res.status(404) if ticket if not found', async () => {
      const mockRes = {...mock.RES};

      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
        delete: jest.fn().mockReturnValue(null),
      };

      const controller = new TicketController(mockTicketService);
      await controller.handleDelete({}, mockRes);

      expect(mockTicketService.get).toBeCalled();
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith(new IdNotFoundError().json());
    });
  });
});
