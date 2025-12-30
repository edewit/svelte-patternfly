<script lang="ts">
  import ExpandableSection from './ExpandableSection.svelte';
  import type { ExpandableSectionProps } from './types';

  interface Props extends ExpandableSectionProps {
    toggleText?: string;
    isExpanded?: boolean;
    displaySize?: 'default' | 'lg';
    isIndented?: boolean;
    variant?: 'default' | 'truncate';
    direction?: 'up' | 'down';
    content?: string;
  }

  let {
    toggleText: _toggleText = 'Show more basic example content',
    isExpanded = false,
    displaySize = 'default',
    isIndented = false,
    variant = 'default',
    direction,
    content
  }: Props = $props();

  let expanded = $state(isExpanded);

  function handleToggle(_event: MouseEvent, newExpanded: boolean) {
    expanded = newExpanded;
  }

  const dynamicToggleText = $derived(
    expanded ? 'Show less basic example content' : 'Show more basic example content'
  );

  const defaultContent = 'This content is visible only when the component is expanded.';
  const truncateContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec dignissim turpis, et tristique purus. Phasellus efficitur ante quis dolor viverra imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque laoreet, sem ac elementum semper, lectus mauris vestibulum nulla, eget volutpat massa neque vel turpis. Donec finibus enim eu leo accumsan consectetur. Praesent massa diam, tincidunt eu dui ac, ullamcorper elementum est. Phasellus metus felis, venenatis vitae semper nc, porta a metus. Vestibulum justo nisi, imperdiet id eleifend at, varius nec lorem. Fusce porttitor mollis nibh, ut elementum ante commodo tincidunt. Integer tincidunt at ipsum non aliquet.';

  const displayContent = $derived(
    content || (variant === 'truncate' ? truncateContent : defaultContent)
  );
</script>

<ExpandableSection
  toggleText={dynamicToggleText}
  onToggle={handleToggle}
  isExpanded={expanded}
  {displaySize}
  {isIndented}
  {variant}
  {direction}
>
  {displayContent}
</ExpandableSection>
