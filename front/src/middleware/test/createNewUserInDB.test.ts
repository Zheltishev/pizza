import createNewUserInDB from "../createNewUserInDB";

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({status: 200, inputField: 'none', message: 'new user created in DB'})
})) as jest.Mock

test('create new user', async () => {
    const data = await createNewUserInDB('login@domain.com', 'newUserPassword')

    expect.assertions(1)
    expect(data).toEqual({status: 200, inputField: 'none', message: 'new user created in DB'})
})
