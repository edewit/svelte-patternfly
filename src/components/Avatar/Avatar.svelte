<script lang="ts">
  import type { AvatarProps, AvatarSize } from './types';
  import '@patternfly/patternfly/components/Avatar/avatar.css';

  interface Props extends AvatarProps {
    src?: string;
    alt: string;
    size?: AvatarSize;
    isBordered?: boolean;
    class?: string;
    [key: string]: unknown;
  }

  let {
    src,
    alt,
    size = 'md',
    isBordered = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-avatar', size !== 'md' && `pf-m-${size}`, isBordered && 'pf-m-bordered', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<img class={classes} {src} {alt} {...restProps} />
