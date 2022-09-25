# testdouble-component

Extends [`testdouble`](https://github.com/testdouble/testdouble.js) with a
`component` function -- with the hopes that creating test doubles for React
components is slightly more approachable.

```ts
import td from "testdouble";
import { setup } from "@bvarberg/testdouble-component";

// Augment testdouble with td.component
setup(td);

// It is likely you'll want to use `td.config` to ignore warnings about stubbing
// and verifying on the same test double
td.config({
  ignoreWarnings: true
});
```

## td.component

Under the hood, `td.component` creates a double using `td.function`.

It sets up a [catch-all stubbing that returns a JSX fragment instead of
`undefined`](https://github.com/testdouble/testdouble.js/issues/390), and sets a `displayName` to improve debugging/console/test runner
output.

---

One way to use `td.component`, using Jest for module replacement.

```tsx
describe("Consumer", () => {
  beforeEach(() => {
    jest.dontMock("./Consumer");
    jest.doMock("./Collaborator", () => ({
      // Create a test double for a function component
      Collaborator: td.component("Collaborator"),
    }));
  });

  test("renders the collaborator with some specific props", async () => {
    const { Collaborator } = await import("./Collaborator");
    const { Consumer } = await import("./Consumer");

    render(<Consumer />); // which renders <Collaborator ... />

    td.verify(Collaborator({ someProp: 'expected' }), { ignoreExtraArgs: true }); // ignore the second context argument
  });
});
```

> When used with Jest + dynamic imports in this way, `Collaborator` will be
> typed based on the real component exported from the module.
