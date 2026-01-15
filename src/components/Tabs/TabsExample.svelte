<script lang="ts">
  import Tabs from './Tabs.svelte';
  import TabList from './TabList.svelte';
  import Tab from './Tab.svelte';
  import TabTitleText from './TabTitleText.svelte';
  import TabContent from './TabContent.svelte';
  import TabContentBody from './TabContentBody.svelte';
  import Checkbox from '../Checkbox/Checkbox.svelte';
  import Tooltip from '../Popover/Popover.svelte';

  interface Props {
    variant?:
      | 'default'
      | 'box'
      | 'vertical'
      | 'filled'
      | 'disabled'
      | 'with-content';
  }

  let { variant = 'default' }: Props = $props();

  let activeTabKey: string | number = $state(0);
  let isBox = $state(false);

  function handleTabClick(event: MouseEvent | KeyboardEvent, tabIndex: string | number) {
    activeTabKey = tabIndex;
  }

  function toggleBox(checked: boolean) {
    isBox = checked;
  }
</script>

{#if variant === 'default'}
  <Tabs
    activeKey={activeTabKey}
    onSelect={handleTabClick}
    {isBox}
    aria-label="Tabs in the default example"
    role="region"
    id="default-tabs"
  >
    <TabList>
      <Tab eventKey={0} aria-label="Default content - users">
        {#snippet title()}<TabTitleText>Users</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={1}>
        {#snippet title()}<TabTitleText>Containers</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={2}>
        {#snippet title()}<TabTitleText>Database</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={3} isDisabled>
        {#snippet title()}<TabTitleText>Disabled</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={4} isAriaDisabled>
        {#snippet title()}<TabTitleText>ARIA Disabled</TabTitleText>{/snippet}
      </Tab>
    </TabList>
  </Tabs>
  <div style="margin-top: 20px;">
    <Checkbox
      label="isBox"
      checked={isBox}
      onchange={(e) => toggleBox(e.currentTarget.checked)}
      aria-label="show box variation checkbox"
      id="toggle-box-default"
      name="toggle-box-default"
    />
  </div>
{:else if variant === 'box'}
  <Tabs
    activeKey={activeTabKey}
    onSelect={handleTabClick}
    isBox={true}
    aria-label="Tabs in the box example"
    role="region"
    id="box-tabs"
  >
    <TabList>
      <Tab eventKey={0}>
        {#snippet title()}<TabTitleText>Users</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={1}>
        {#snippet title()}<TabTitleText>Containers</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={2}>
        {#snippet title()}<TabTitleText>Database</TabTitleText>{/snippet}
      </Tab>
    </TabList>
  </Tabs>
{:else if variant === 'vertical'}
  <Tabs
    activeKey={activeTabKey}
    onSelect={handleTabClick}
    isVertical={true}
    aria-label="Tabs in the vertical example"
    role="region"
    id="vertical-tabs"
  >
    <TabList>
      <Tab eventKey={0}>
        {#snippet title()}<TabTitleText>Users</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={1}>
        {#snippet title()}<TabTitleText>Containers</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={2}>
        {#snippet title()}<TabTitleText>Database</TabTitleText>{/snippet}
      </Tab>
    </TabList>
  </Tabs>
{:else if variant === 'filled'}
  <Tabs
    activeKey={activeTabKey}
    onSelect={handleTabClick}
    isFilled={true}
    aria-label="Tabs in the filled example"
    role="region"
    id="filled-tabs"
  >
    <TabList>
      <Tab eventKey={0}>
        {#snippet title()}<TabTitleText>Users</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={1}>
        {#snippet title()}<TabTitleText>Containers</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={2}>
        {#snippet title()}<TabTitleText>Database</TabTitleText>{/snippet}
      </Tab>
    </TabList>
  </Tabs>
{:else if variant === 'disabled'}
  <Tabs
    activeKey={activeTabKey}
    onSelect={handleTabClick}
    aria-label="Tabs with disabled example"
    role="region"
    id="disabled-tabs"
  >
    <TabList>
      <Tab eventKey={0}>
        {#snippet title()}<TabTitleText>Users</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={1}>
        {#snippet title()}<TabTitleText>Containers</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={2} isDisabled>
        {#snippet title()}<TabTitleText>Disabled</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={3} isAriaDisabled>
        {#snippet title()}<TabTitleText>ARIA Disabled</TabTitleText>{/snippet}
      </Tab>
    </TabList>
  </Tabs>
{:else if variant === 'with-content'}
  <Tabs
    activeKey={activeTabKey}
    onSelect={handleTabClick}
    aria-label="Tabs with content example"
    role="region"
    id="content-tabs"
  >
    <TabList>
      <Tab eventKey={0}>
        {#snippet title()}<TabTitleText>Users</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={1}>
        {#snippet title()}<TabTitleText>Containers</TabTitleText>{/snippet}
      </Tab>
      <Tab eventKey={2}>
        {#snippet title()}<TabTitleText>Database</TabTitleText>{/snippet}
      </Tab>
    </TabList>
  </Tabs>
  <TabContent eventKey={0} id="content-tabs-0-panel">
    <TabContentBody>Users content</TabContentBody>
  </TabContent>
  <TabContent eventKey={1} id="content-tabs-1-panel">
    <TabContentBody>Containers content</TabContentBody>
  </TabContent>
  <TabContent eventKey={2} id="content-tabs-2-panel">
    <TabContentBody>Database content</TabContentBody>
  </TabContent>
{/if}
