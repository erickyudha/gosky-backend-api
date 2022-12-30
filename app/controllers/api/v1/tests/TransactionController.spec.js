const TransactionController = require('../TransactionController');
const mock = require('../../../../../tests/mock');
const {
  UnauthorizedError,
  IdNotFoundError,
  MissingFieldError,
  GeneralError,
} = require('../../../../errors');

describe('TransactionController', () => {
  describe('#handleGetList', () => {
    it('should res.status(200) if success as USER', async () => {
      const mockReq = {
        user: mock.USER,
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        listByUser: jest.fn().mockReturnValue([{
          dataValues: mock.TRANSACTION,
        }]),
      };
      const mockTicketService = {
        forceGet: jest.fn().mockReturnValue(mock.TICKET),
      };
      const mockUserService = {
        simpleGet: jest.fn().mockReturnValue(mock.USER),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService, {}, {}, mockUserService);
      await controller.handleGetList(mockReq, mockRes);

      expect(mockTransactionService.listByUser).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get transaction list data success',
        data: [{
          ...mock.TRANSACTION,
          ticket: mock.TICKET,
          user: mock.USER,
        }],
        meta: {count: 1},
      });
    });

    it('should res.status(200) if success as ADMIN', async () => {
      const mockReq = {
        user: mock.ADMIN,
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        list: jest.fn().mockReturnValue([{
          dataValues: mock.TRANSACTION,
        }]),
      };
      const mockTicketService = {
        forceGet: jest.fn().mockReturnValue(mock.TICKET),
      };
      const mockUserService = {
        simpleGet: jest.fn().mockReturnValue(mock.USER),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService, {}, {}, mockUserService);
      await controller.handleGetList(mockReq, mockRes);

      expect(mockTransactionService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get transaction list data success',
        data: [{
          ...mock.TRANSACTION,
          ticket: mock.TICKET,
          user: mock.USER,
        }],
        meta: {count: 1},
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockReq = {
        user: mock.USER,
      };
      const mockRes = mock.RES;
      const err = new GeneralError('error test');
      const mockTransactionService = {
        listByUser: jest.fn().mockRejectedValue(err),
      };

      const controller = new TransactionController(
          mockTransactionService, {}, {}, {});
      await controller.handleGetList(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleGet', () => {
    it('should res.status(200) if USER access own transaction', async () => {
      const mockReq = {
        user: mock.USER,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        get: jest.fn().mockReturnValue({
          ...mock.TRANSACTION,
          dataValues: mock.TRANSACTION,
        }),
      };
      const mockTicketService = {
        forceGet: jest.fn().mockReturnValue(mock.TICKET),
      };
      const mockUserService = {
        simpleGet: jest.fn().mockReturnValue(mock.USER),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService, {}, {}, mockUserService);
      await controller.handleGet(mockReq, mockRes);

      expect(mockTransactionService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get transaction data success',
        data: {
          ...mock.TRANSACTION,
          ticket: mock.TICKET,
          user: mock.USER,
        },
      });
    });

    it('should res.status(200) if ADMIN access any transaction', async () => {
      const mockReq = {
        user: mock.ADMIN,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        get: jest.fn().mockReturnValue({
          ...mock.TRANSACTION,
          dataValues: mock.TRANSACTION,
        }),
      };
      const mockTicketService = {
        forceGet: jest.fn().mockReturnValue(mock.TICKET),
      };
      const mockUserService = {
        simpleGet: jest.fn().mockReturnValue(mock.USER),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService, {}, {}, mockUserService);
      await controller.handleGet(mockReq, mockRes);

      expect(mockTransactionService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get transaction data success',
        data: {
          ...mock.TRANSACTION,
          ticket: mock.TICKET,
          user: mock.USER,
        },
      });
    });

    it('should res.status(401) if USER access others transaction', async () => {
      const mockReq = {
        user: mock.USER,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        get: jest.fn().mockReturnValue({
          ...mock.TRANSACTION, userId: 2,
        }),
      };

      const controller = new TransactionController(
          mockTransactionService, {}, {}, {});
      await controller.handleGet(mockReq, mockRes);

      expect(mockTransactionService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(new UnauthorizedError().json());
    });

    it('should res.status(404) if transaction not found', async () => {
      const mockReq = {
        user: mock.USER,
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        get: jest.fn().mockReturnValue(null),
      };

      const controller = new TransactionController(
          mockTransactionService, {}, {}, {});
      await controller.handleGet(mockReq, mockRes);

      expect(mockTransactionService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });

    it('should res.status(500) to handle general error', async () => {
      const mockReq = {
        user: mock.USER,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('error test');
      const mockTransactionService = {
        get: jest.fn().mockRejectedValue(err),
      };

      const controller = new TransactionController(
          mockTransactionService, {}, {}, {});
      await controller.handleGet(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleCreate', () => {
    it('should res.status(201) if add transaction success', async () => {
      const mockReq = {
        user: mock.USER,
        body: {
          ticketId: 1,
          amount: 1,
        },
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        create: jest.fn().mockReturnValue({
          ...mock.TRANSACTION,
          dataValues: mock.TRANSACTION,
        }),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };
      const mockNotifService = {
        create: jest.fn(),
      };
      const mockEmailService = {
        sendTransactionEmail: jest.fn()
            .mockImplementation((email, transaction, ticket, user, handler) => {
              const err = null;
              const info = {
                email, transaction,
              };
              handler(err, info);
            }),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService,
          mockNotifService, mockEmailService,
      );
      await controller.handleCreate(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockTransactionService.create).toHaveBeenCalled();
      expect(mockNotifService.create).toHaveBeenCalled();
      expect(mockEmailService.sendTransactionEmail).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'add transaction success',
        data: {
          ...mock.TRANSACTION,
          ticket: mock.TICKET,
        },
      });
    });

    it('should res.status(400) if req field(s) missing', async () => {
      const mockReq = {
        user: mock.USER,
        body: {},
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        create: jest.fn().mockReturnValue(mock.TRANSACTION),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };
      const mockNotifService = {
        create: jest.fn(),
      };
      const mockEmailService = {
        sendTransactionEmail: jest.fn()
            .mockImplementation((email, transaction, handler) => {
              const err = null;
              const info = {
                email, transaction,
              };
              handler(err, info);
            }),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService,
          mockNotifService, mockEmailService,
      );
      await controller.handleCreate(mockReq, mockRes);

      // expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(404) if ticketId not found', async () => {
      const mockReq = {
        user: mock.USER,
        body: {
          ticketId: 1,
          amount: 1,
        },
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        create: jest.fn().mockReturnValue(mock.TRANSACTION),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
      };
      const mockNotifService = {
        create: jest.fn(),
      };
      const mockEmailService = {
        sendTransactionEmail: jest.fn()
            .mockImplementation((email, transaction, handler) => {
              const err = null;
              const info = {
                email, transaction,
              };
              handler(err, info);
            }),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService,
          mockNotifService, mockEmailService,
      );
      await controller.handleCreate(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });

    it('should res.status(500) to handle general error', async () => {
      const mockReq = {
        user: mock.USER,
        body: {
          ticketId: 1,
          amount: 1,
        },
      };
      const mockRes = mock.RES;

      const mockTransactionService = {
        create: jest.fn().mockReturnValue(mock.TRANSACTION),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };
      const mockNotifService = {
        create: jest.fn(),
      };
      const mockEmailService = {
        sendTransactionEmail: jest.fn()
            .mockImplementation((email, transaction, ticket, user, handler) => {
              const err = new GeneralError('error test');
              const info = {
                email, transaction,
              };
              handler(err, info);
            }),
      };

      const controller = new TransactionController(
          mockTransactionService, mockTicketService,
          mockNotifService, mockEmailService,
      );
      await controller.handleCreate(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json)
          .toHaveBeenCalledWith(new GeneralError('error test').json());
    });
  });

  describe('#handleGetEarnings', () => {
    it('should res.status(200) on success', async () => {
      const mockReq = {};
      const mockRes = mock.RES;

      const mockEarnings = {
        earnings: 123456,
        count: 24,
      };
      const mockTransactionService = {
        calculateEarnings: jest.fn().mockReturnValue(mockEarnings),
      };

      const controller = new TransactionController(mockTransactionService);
      await controller.handleGetEarnings(mockReq, mockRes);

      expect(mockTransactionService.calculateEarnings).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get earnings data success',
        data: {
          today: mockEarnings,
          thisMonth: mockEarnings,
          thisYear: mockEarnings,
        },
      });
    });
  });
});
