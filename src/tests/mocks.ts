
export const mockAuth = (authUser?: string) => {
    jest.doMock('../utils/auth', () => ({
        ...(jest.requireActual('../utils/auth')),
        __esModule: true,
        authCheck: (req: any, _res: any, next: any) => {
            req["auth"] = {sub: authUser || "mock_user"}
            next()
        }
    }))
}
