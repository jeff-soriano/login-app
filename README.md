This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

I used Node v18.17.0 for testing this app. I recommend using the same version to avoid any potential issues.

To run the app, use:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Per the [https://reqres.in/](https://reqres.in/) docs, use the following login credentials to get a successful login result:

email : eve.holt@reqres.in
password: cityslicka

To test the app, use:

```bash
npm run test
```

## Tech stack and libraries used

Next.js, React, Tailwind CSS, lodash.debounce, Jest, React testing library

## Technical commentary

- I went with `onChange` for validation, so I needed some extra validation around if the inputs were empty. I also used `lodash.debounce` to add a small 2 second delay after the user types before showing the error message. This allows for a better UX as the error message would show up immediately otherwise
- Since I'm using a `<form>` tag around the input elements, there may be additional error handling from the base HTML tags (such as if you try to submit the form with an invalid email). This means there will be two ways the error message will display. However, I believe this is acceptable as using the `<form>` tag is more semantically correct than a generic `<div>`, and also leads to potential [a11y benefits](https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140916/G184)
- The `LOGIN_FAILED_PRE_MESSAGE` may be puzzling, but it's there so that the message that shows before the login error message can be easily modified. I used the login messaging to detect if there's an error (line `225`). Typically I don't like using string compares in place of regular booleans, but then we'd need to track two separate states for the login (the error message, and the login success/failure state). I went this route as it was simpler to implement and keep track of
- Next.js is not necesarry at all for this simple of an app, however, the official React docs [recommend always using a framework for React apps](https://react.dev/learn/start-a-new-react-project), so I like to be in the habit of doing this
