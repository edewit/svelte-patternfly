export type SkeletonShape = 'circle' | 'square';

export type SkeletonFontSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

export interface SkeletonProps {
  /** Width of the skeleton. Provide a percentage or fixed value (e.g., '25%', '200px') */
  width?: string;
  /** Height of the skeleton. Provide a percentage or fixed value (e.g., '25%', '200px') */
  height?: string;
  /** Font size modifier for text-based skeletons */
  fontSize?: SkeletonFontSize;
  /** Shape of the skeleton */
  shape?: SkeletonShape;
  /** Text read by screen readers */
  screenreaderText?: string;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}
