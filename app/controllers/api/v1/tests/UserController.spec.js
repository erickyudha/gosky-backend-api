describe('#handleGetUser', () => {
  it('should res.status(200) and return simple user data', async () => {
    const mockReq = {
      params: {
        id: 1,
      },
    };
    const mockRes = { ...mock.RES };
    const mockUser = { ...mock.USER };
    const mockUserService = {
      get: jest.fn().mockReturnValue(mockUser),
    };
    const expectedResData = {
      id: mockUser.id,
      name: mockUser.name,
      role: mockUser.role,
      imageUrl: mockUser.imageUrl,
    };

    const controller = new AuthController(mockUserService, {}, bcrypt, jwt);
    await controller.handleGetUser(mockReq, mockRes);

    expect(mockUserService.get).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'get user data success',
      data: expectedResData,
    });
  });

  it('should res.status(404) if id not found', async () => {
    const mockReq = {
      params: {
        id: 1,
      },
    };
    const mockRes = { ...mock.RES };
    const mockUserService = {
      get: jest.fn().mockReturnValue(null),
    };

    const controller = new AuthController(mockUserService, {}, bcrypt, jwt);
    await controller.handleGetUser(mockReq, mockRes);

    expect(mockUserService.get).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
  });
});