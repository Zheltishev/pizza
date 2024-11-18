import signUpNewUser from "../signUpNewUser"

const mockJsonData = Promise.resolve({status: 400, inputField: 'login', message: 'почта занята'})
const mockFetchData = Promise.resolve({json: () => mockJsonData})
global.fetch = jest.fn().mockImplementation(() => mockFetchData)

test('sign up new user occupied login', async() => {
    const data = await signUpNewUser('kate@mail.com', 'katepassword')

    expect(data).toEqual({status: 400, inputField: 'login', message: 'почта занята'})
})