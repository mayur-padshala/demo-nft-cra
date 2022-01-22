import { rest, setupWorker } from 'msw';
import endpoint from 'utils/helpers';

const verificationCodes = {
  email: '102938',
  phone: '583024',
};

const users: any = {};

const randomDelay = () => Math.random() * 500
  + Math.random() * 500
  + Math.random() * 1000
  + Math.random() * 2000
  + 500;

// Define request handlers and response resolvers.
const worker = setupWorker(
  rest.post(endpoint('send-verification-code'), (req, res, ctx) => res(
    ctx.delay(randomDelay()),
    ctx.status(200),
    ctx.json({
      message: 'Verification code sent.',
    }),
  )),

  rest.post(endpoint('verify-code'), (req: any, res, ctx) => {
    const { code, type } = req.body;
    if (['email', 'phone'].indexOf(type) === -1) {
      return res(
        ctx.delay(randomDelay()),
        ctx.status(400),
        ctx.json({
          message: 'Invalid value for parameter: type',
        }),
      );
    }
    // @ts-ignore
    if (!code || code !== verificationCodes[type]) {
      return res(
        ctx.delay(randomDelay()),
        ctx.status(400),
        ctx.json({
          message: 'Invalid code',
        }),
      );
    }
    return res(
      ctx.delay(randomDelay()),
      ctx.status(200),
      ctx.json({
        message: 'OK',
      }),
    );
  }),

  rest.post(endpoint('signup'), (req: any, res, ctx) => {
    const {
      accountID,
      fullName,
      type,
      username,
      password,
    } = req.body;

    users[accountID] = {
      accountID,
      fullName,
      type,
      username,
      password,
    };

    return res(
      ctx.delay(randomDelay()),
      ctx.status(200),
      ctx.json({
        message: 'Signup successful.',
        data: users[accountID],
      }),
    );
  }),
);

export default worker;
