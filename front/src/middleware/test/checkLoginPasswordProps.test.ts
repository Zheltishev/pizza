import { checkingLoginPasswordProps } from "../checkLoginPasswordProps"

test('validate login and password length', () => {
    const data = checkingLoginPasswordProps('example@gmail.com', 'reu23kjds931')
    
    expect(data).toEqual({status: true, inputField: 'none', message: 'none'})
})