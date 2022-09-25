import { FunctionComponent } from "react";
import type { } from "testdouble";

export function setup(testdouble: any) {
  const td = testdouble;

  function component<F>(displayName = "TestDoubleFunctionComponent") {
    const ComponentDouble = td.function(displayName) as FunctionComponent;
    ComponentDouble.displayName = displayName;

    // see: https://github.com/testdouble/testdouble.js/issues/390
    const anyProps = td.matchers.anything();
    td.when(ComponentDouble(anyProps), { ignoreExtraArgs: true }).thenReturn(
      <>{displayName}</>
    );

    return ComponentDouble as unknown as F;
  }

  td.component = component;
}

declare module "testdouble" {
  /**
   * Create a fake function component.
   *
   * @param displayName Name of function component for better messages.
   */
  export function component<F>(displayName?: string): F;
}
