import { designSystem } from './designSystem';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: typeof designSystem.color;
    filter: typeof designSystem.filter;
    radius: typeof designSystem.radius;
    fontSize: typeof designSystem.fontSize;
    opacity: typeof designSystem.opacity;
  }
}
