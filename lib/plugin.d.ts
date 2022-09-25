export * from './testdouble-component'

declare module "testdouble" {
  /**
   * Create a fake function component.
   *
   * @param displayName Name of function component for better messages.
   */
  export function component<F>(displayName?: string): F;
}
