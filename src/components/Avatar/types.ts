export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  isBordered?: boolean;
  class?: string;
}
