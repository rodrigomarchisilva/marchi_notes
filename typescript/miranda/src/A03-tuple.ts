// By standard, tuples are arrays defined by the number of elements and their types
// By standard, values can be changed, but not the types or the number of elements

const clientData: [number, string] = [1, 'kim'];
const clientData2: [number, string, ...string[]] = [1, 'kim', 'seoul', 'USA']; // now we can add as many strings as we want
const clientData3: readonly [number, string] = [1, 'kim']; // now we can't change the values

// clientData[0] = 'kim'; // error
// clientData[1] = 1; // error
clientData[0] = 2; // ok
clientData[1] = 'lee'; // ok

clientData2[4] = 'dollars'; // ok

// clientData3[0] = 2; // error

export { clientData, clientData2, clientData3 };
