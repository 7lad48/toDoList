import {CHANGE_NAME, INCREMENT_AGE, INCREMENT_CHILDREN_COUNT, StateType, userReducer} from './userReducer'
let startState: StateType;
beforeEach(() => {
    startState = {age: 20, childrenCount: 2, name: 'Dimych'}
});


test('user reducer should increment only age', () => {
    const endState = userReducer(startState, {type: INCREMENT_AGE})
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
});
test('user reducer should increment only childrenCount', () => {
    // your code here
    const endState = userReducer(startState, {type: INCREMENT_CHILDREN_COUNT})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
    expect(startState).not.toBe(endState)
});
test('user reducer should change name of user', () => {
    // your code here
    const newName = 'Viktor'
    const endState = userReducer(startState, {type: CHANGE_NAME, newName})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe(newName)
    expect(startState).not.toBe(endState)
})
