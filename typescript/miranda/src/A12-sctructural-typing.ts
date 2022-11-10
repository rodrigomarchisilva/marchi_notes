type VerifyUserFn = (user: User, sentValue: User) => boolean;

type User = { username: string; password: string };

const verifyUser: VerifyUserFn = (user, sentValue) => {
  return (
    user.username === sentValue.username && user.password === sentValue.password
  );
};

const bdUser = { username: 'bd', password: '1234' };
const bdSent = { username: 'bd', password: '1234', nickname: 'buddy' };
// TypeScript doesn't care about the extra property, it only cares about properties that are required
const bdLoggedIn = verifyUser(bdUser, bdSent);
console.log(bdLoggedIn);

export { bdLoggedIn };
