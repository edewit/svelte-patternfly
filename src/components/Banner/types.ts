export type BannerColorVariant =
  | 'default'
  | 'red'
  | 'orangered'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'purple';

export type BannerStatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'custom';

export interface BannerProps {
  colorVariant?: BannerColorVariant;
  statusVariant?: BannerStatusVariant;
  isSticky?: boolean;
  screenReaderText?: string;
  customIcon?: string;
  id?: string;
  class?: string;
}
