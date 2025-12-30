<script lang="ts">
  import Page from './Page.svelte';
  import PageSidebar from './PageSidebar.svelte';
  import PageSidebarBody from './PageSidebarBody.svelte';
  import PageSection from './PageSection.svelte';
  import PageGroup from './PageGroup.svelte';
  import PageToggleButton from './PageToggleButton.svelte';
  import Masthead from '../Masthead/Masthead.svelte';
  import MastheadMain from '../Masthead/MastheadMain.svelte';
  import MastheadToggle from '../Masthead/MastheadToggle.svelte';
  import MastheadBrand from '../Masthead/MastheadBrand.svelte';
  import MastheadLogo from '../Masthead/MastheadLogo.svelte';
  import MastheadContent from '../Masthead/MastheadContent.svelte';
  import Toolbar from '../Toolbar/Toolbar.svelte';
  import ToolbarContent from '../Toolbar/ToolbarContent.svelte';
  import ToolbarItem from '../Toolbar/ToolbarItem.svelte';
  import Nav from '../Navigation/Nav.svelte';
  import NavList from '../Navigation/NavList.svelte';
  import NavItem from '../Navigation/NavItem.svelte';

  interface Props {
    showSidebar?: boolean;
    showNavigation?: boolean;
    sidebarContent?: string;
    section1Title?: string;
    section2Title?: string;
    section3Title?: string;
    useManagedSidebar?: boolean;
    isContentFilled?: boolean;
    id?: string;
  }

  let {
    showSidebar = true,
    showNavigation = true,
    sidebarContent = 'Navigation',
    section1Title = 'Vertical nav example section 1',
    section2Title = 'Vertical nav example section 2 with secondary variant styling',
    section3Title = 'Vertical nav example section 3',
    useManagedSidebar = false,
    isContentFilled = false,
    id
  }: Props = $props();

  let isSidebarOpen = $state(true);

  const onSidebarToggle = () => {
    isSidebarOpen = !isSidebarOpen;
  };
</script>

{#snippet mastheadSnippet()}
  <Masthead>
    <MastheadMain>
      {#if showSidebar}
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={onSidebarToggle}
            id="vertical-nav-toggle"
          />
        </MastheadToggle>
      {/if}
      <MastheadBrand>
        <MastheadLogo href="https://patternfly.org" target="_blank">
          Logo
        </MastheadLogo>
      </MastheadBrand>
    </MastheadMain>
    <MastheadContent>
      <Toolbar id="vertical-toolbar">
        <ToolbarContent>
          <ToolbarItem>header-tools</ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </MastheadContent>
  </Masthead>
{/snippet}

{#snippet sidebarSnippet()}
  <PageSidebar isSidebarOpen={isSidebarOpen} id="vertical-sidebar">
    <PageSidebarBody>
      {#if showNavigation}
        <Nav>
          <NavList>
            <NavItem itemId="nav-1" to="#section-1">
              Section 1
            </NavItem>
            <NavItem itemId="nav-2" to="#section-2">
              Section 2
            </NavItem>
            <NavItem itemId="nav-3" to="#section-3">
              Section 3
            </NavItem>
          </NavList>
        </Nav>
      {:else}
        {sidebarContent}
      {/if}
    </PageSidebarBody>
  </PageSidebar>
{/snippet}

{#snippet childrenSnippet()}
  <PageSection aria-labelledby="section-1">
    <h2 id="section-1">{section1Title}</h2>
  </PageSection>
  <PageSection variant="secondary" aria-labelledby="section-2">
    <h2 id="section-2">{section2Title}</h2>
  </PageSection>
  <PageSection aria-labelledby="section-3">
    <h2 id="section-3">{section3Title}</h2>
  </PageSection>
{/snippet}

<Page
  isManagedSidebar={useManagedSidebar}
  isContentFilled={isContentFilled}
  {id}
  masthead={mastheadSnippet}
  sidebar={showSidebar ? sidebarSnippet : undefined}
  children={childrenSnippet}
/>

