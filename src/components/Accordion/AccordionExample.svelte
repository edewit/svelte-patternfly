<script lang="ts">
  import Accordion from './Accordion.svelte';
  import AccordionItem from './AccordionItem.svelte';
  import AccordionToggle from './AccordionToggle.svelte';
  import AccordionToggleText from './AccordionToggleText.svelte';
  import AccordionToggleIcon from './AccordionToggleIcon.svelte';
  import AccordionContent from './AccordionContent.svelte';
  import AccordionExpandableContentBody from './AccordionExpandableContentBody.svelte';
  import type { AccordionProps } from './types';

  interface Props extends AccordionProps {
    items?: Array<{
      title: string;
      content: string;
      isExpanded?: boolean;
    }>;
  }

  let {
    items: initialItems = [
      {
        title: 'Item one',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        isExpanded: false
      },
      {
        title: 'Item two',
        content:
          'Vivamus et tortor sed arcu congue vehicula eget et diam. Praesent nec dictum lorem. Aliquam id diam ultrices, faucibus erat id, maximus nunc.',
        isExpanded: false
      },
      {
        title: 'Item three',
        content:
          'Morbi vitae urna quis nunc convallis hendrerit. Aliquam congue orci quis ultricies tempus.',
        isExpanded: false
      }
    ],
    asDefinitionList = false,
    isBordered = false,
    displaySize,
    toggleIconPosition,
    isMultipleExpandable = false,
    isFixed = false,
    class: className = ''
  }: Props = $props();

  let items = $state(initialItems);

  function toggleItem(index: number) {
    if (isMultipleExpandable) {
      items[index].isExpanded = !items[index].isExpanded;
    } else {
      // Single expand behavior
      items.forEach((item, i) => {
        item.isExpanded = i === index ? !item.isExpanded : false;
      });
    }
  }
</script>

<Accordion
  {asDefinitionList}
  {isBordered}
  {displaySize}
  {toggleIconPosition}
  {isMultipleExpandable}
  {isFixed}
  class={className}
>
  {#each items as item, index}
    <AccordionItem isExpanded={item.isExpanded}>
      <AccordionToggle isExpanded={item.isExpanded} onclick={() => toggleItem(index)}>
        <AccordionToggleText>{item.title}</AccordionToggleText>
        <AccordionToggleIcon />
      </AccordionToggle>
      <AccordionContent isExpanded={item.isExpanded}>
        <AccordionExpandableContentBody>
          {item.content}
        </AccordionExpandableContentBody>
      </AccordionContent>
    </AccordionItem>
  {/each}
</Accordion>
