import signUpNewUser from "../signUpNewUser"

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({status: 200, inputField: 'none', message: 'new user created in DB'})
})) as jest.Mock

test('check sign up new user', async() => {
    const data = await signUpNewUser('newUser@mail.com', 'newuserpassword')

    expect(data).toEqual({status: 200, inputField: 'none', message: 'new user created in DB'})
})

test('sign up new user error login length', async() => {
    const data = await signUpNewUser('asd', 'newuserpassword')

    expect(data).toEqual({status: 400, inputField: 'login', message: 'логин слишком короткий'})
})

test('sign up new user error password length', async() => {
    const data = await signUpNewUser('newUser@mail.com', 'pas')

    expect(data).toEqual({status: 400, inputField: 'password', message: 'пароль слишком короткий'})
})

test('sign up new user error login format', async() => {
    const data = await signUpNewUser('newUserLogin', 'newuserpassword')

    expect(data).toEqual({status: 400, inputField: 'login', message: 'неправильный формат почты'})
})