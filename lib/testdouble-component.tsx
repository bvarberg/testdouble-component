import { FunctionComponent } from "react";

export default function setup(testdouble: any) {
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
