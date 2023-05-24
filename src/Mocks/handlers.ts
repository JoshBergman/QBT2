import { rest } from "msw";

export const handlers = [
  rest.get("https://swapi.dev/api/people/1/", (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }));
  }),
];
