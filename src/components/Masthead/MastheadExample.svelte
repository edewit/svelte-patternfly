<script lang="ts">
  import Masthead from './Masthead.svelte';
  import MastheadMain from './MastheadMain.svelte';
  import MastheadToggle from './MastheadToggle.svelte';
  import MastheadBrand from './MastheadBrand.svelte';
  import MastheadLogo from './MastheadLogo.svelte';
  import MastheadContent from './MastheadContent.svelte';
  import Button from '../Button/Button.svelte';
  import Brand from '../Brand/Brand.svelte';
  import type { MastheadDisplayBreakpoints, MastheadInsetBreakpoints } from './types';

  interface Props {
    id?: string;
    display?: MastheadDisplayBreakpoints;
    inset?: MastheadInsetBreakpoints;
    useBrand?: boolean;
    logoText?: string;
    contentText?: string;
    useMixedContent?: boolean;
  }

  let {
    id = 'basic-masthead',
    display,
    inset,
    useBrand = false,
    logoText = 'Logo',
    contentText = 'Content',
    useMixedContent = false
  }: Props = $props();
</script>

<Masthead {id} {display} {inset}>
  <MastheadMain>
    <MastheadToggle>
      <Button variant="plain" aria-label="Global navigation" class="pf-m-hamburger">
        <span class="pf-v6-c-button__icon">
          <svg
            viewBox="0 0 10 10"
            class="pf-v6-c-button--hamburger-icon pf-v6-svg"
            width="1em"
            height="1em"
          >
            <path class="pf-v6-c-button--hamburger-icon--top" d="M1,1 L9,1" />
            <path class="pf-v6-c-button--hamburger-icon--middle" d="M1,5 L9,5" />
            <path
              class="pf-v6-c-button--hamburger-icon--arrow"
              d="M1,5 L1,5 L1,5"
            />
            <path class="pf-v6-c-button--hamburger-icon--bottom" d="M9,9 L1,9" />
          </svg>
        </span>
      </Button>
    </MastheadToggle>
    <MastheadBrand>
      <MastheadLogo component="a" href="#">
        {#if useBrand}
          <Brand src="/assets/images/PF-HorizontalLogo-Color.svg" alt="PatternFly" />
        {:else}
          {logoText}
        {/if}
      </MastheadLogo>
    </MastheadBrand>
  </MastheadMain>
  <MastheadContent>
    {#if useMixedContent}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    {:else}
      {contentText}
    {/if}
  </MastheadContent>
</Masthead>

