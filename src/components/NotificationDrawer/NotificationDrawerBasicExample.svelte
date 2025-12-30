<script lang="ts">
  import NotificationDrawer from './NotificationDrawer.svelte';
  import NotificationDrawerBody from './NotificationDrawerBody.svelte';
  import NotificationDrawerHeader from './NotificationDrawerHeader.svelte';
  import NotificationDrawerList from './NotificationDrawerList.svelte';
  import NotificationDrawerListItem from './NotificationDrawerListItem.svelte';
  import NotificationDrawerListItemHeader from './NotificationDrawerListItemHeader.svelte';
  import NotificationDrawerListItemBody from './NotificationDrawerListItemBody.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';
  import DropdownList from '../Dropdown/DropdownList.svelte';
  import DropdownItem from '../Dropdown/DropdownItem.svelte';
  import MenuToggle from '../MenuToggle/MenuToggle.svelte';
  import EllipsisVIcon from '../Icon/icons/EllipsisVIcon.svelte';
  import Icon from '../Icon/Icon.svelte';

  let isOpenMap = $state(new Array(7).fill(false));

  function onOpenChange(index: number) {
    return (isOpen: boolean) => {
      const newState = [...isOpenMap.slice(0, index), isOpen, ...isOpenMap.slice(index + 1)];
      isOpenMap = newState;
    };
  }

  function onSelect() {
    isOpenMap = new Array(7).fill(false);
  }

  function onDrawerClose(_event: MouseEvent | KeyboardEvent) {
    isOpenMap = new Array(7).fill(false);
  }

  const [isOpen0, isOpen1, isOpen2, isOpen3, isOpen4, isOpen5, isOpen6] = isOpenMap;
</script>

{#snippet ellipsisIcon()}
  <Icon size="sm">
    <EllipsisVIcon />
  </Icon>
{/snippet}

{#snippet headerToggle()}
  <MenuToggle
    isExpanded={isOpen0}
    variant="plain"
    aria-label="Basic example header kebab toggle"
    icon={ellipsisIcon}
  />
{/snippet}

{#snippet toggle1()}
  <MenuToggle
    isExpanded={isOpen1}
    variant="plain"
    aria-label="Basic example notification 1 kebab toggle"
    icon={ellipsisIcon}
  />
{/snippet}

{#snippet toggle2()}
  <MenuToggle
    isExpanded={isOpen2}
    variant="plain"
    aria-label="Basic example notification 2 kebab toggle"
    icon={ellipsisIcon}
  />
{/snippet}

{#snippet toggle3()}
  <MenuToggle
    isExpanded={isOpen3}
    variant="plain"
    aria-label="Basic example notification 3 kebab toggle"
    icon={ellipsisIcon}
  />
{/snippet}

{#snippet toggle4()}
  <MenuToggle
    isExpanded={isOpen4}
    variant="plain"
    aria-label="Basic example notification 4 kebab toggle"
    icon={ellipsisIcon}
  />
{/snippet}

{#snippet toggle5()}
  <MenuToggle
    isExpanded={isOpen5}
    variant="plain"
    aria-label="Basic example notification 5 kebab toggle"
    icon={ellipsisIcon}
  />
{/snippet}

{#snippet toggle6()}
  <MenuToggle
    isExpanded={isOpen6}
    variant="plain"
    aria-label="Basic example notification 6 kebab toggle"
    icon={ellipsisIcon}
  />
{/snippet}

<NotificationDrawer>
  <NotificationDrawerHeader count={3} onClose={onDrawerClose}>
    {#snippet children()}
      <Dropdown
        onSelect={onSelect}
        isOpen={isOpen0}
        onOpenChange={onOpenChange(0)}
        toggle={headerToggle}
      >
        {#snippet children()}
          <DropdownList>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem
              to="#default-link2"
              onClick={(ev) => ev.preventDefault()}
            >
              Link
            </DropdownItem>
            <DropdownItem isDisabled>Disabled Action</DropdownItem>
            <DropdownItem isDisabled to="#default-link4">
              Disabled Link
            </DropdownItem>
          </DropdownList>
        {/snippet}
      </Dropdown>
    {/snippet}
  </NotificationDrawerHeader>
  <NotificationDrawerBody>
    <NotificationDrawerList aria-label="Notifications in the basic example">
      <NotificationDrawerListItem variant="info">
        <NotificationDrawerListItemHeader
          variant="info"
          title="Unread info notification title"
          srTitle="Info notification:"
        >
          {#snippet children()}
            <Dropdown
              onSelect={onSelect}
              isOpen={isOpen1}
              onOpenChange={onOpenChange(1)}
              toggle={toggle1}
            >
              {#snippet children()}
                <DropdownList>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem
                    to="#default-link2"
                    onClick={(ev) => ev.preventDefault()}
                  >
                    Link
                  </DropdownItem>
                  <DropdownItem isDisabled>Disabled Action</DropdownItem>
                  <DropdownItem isDisabled to="#default-link4">
                    Disabled Link
                  </DropdownItem>
                </DropdownList>
              {/snippet}
            </Dropdown>
          {/snippet}
        </NotificationDrawerListItemHeader>
        <NotificationDrawerListItemBody timestamp="5 minutes ago">
          This is an info notification description.
        </NotificationDrawerListItemBody>
      </NotificationDrawerListItem>

      <NotificationDrawerListItem variant="danger">
        <NotificationDrawerListItemHeader
          variant="danger"
          title="Unread danger notification title. This is a long title to show how the title will wrap if it is long and wraps to multiple lines."
          srTitle="Danger notification:"
        >
          {#snippet children()}
            <Dropdown
              onSelect={onSelect}
              isOpen={isOpen2}
              onOpenChange={onOpenChange(2)}
              toggle={toggle2}
            >
              {#snippet children()}
                <DropdownList>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem
                    to="#default-link2"
                    onClick={(ev) => ev.preventDefault()}
                  >
                    Link
                  </DropdownItem>
                  <DropdownItem isDisabled>Disabled Action</DropdownItem>
                  <DropdownItem isDisabled to="#default-link4">
                    Disabled Link
                  </DropdownItem>
                </DropdownList>
              {/snippet}
            </Dropdown>
          {/snippet}
        </NotificationDrawerListItemHeader>
        <NotificationDrawerListItemBody timestamp="10 minutes ago">
          This is a danger notification description. This is a long description to show how the title will wrap if
          it is long and wraps to multiple lines.
        </NotificationDrawerListItemBody>
      </NotificationDrawerListItem>

      <NotificationDrawerListItem variant="danger">
        <NotificationDrawerListItemHeader
          truncateTitle={1}
          variant="danger"
          title="Unread danger notification title. This is a long title to show how the title will be truncated if it is long and will be shown in a single line."
          srTitle="Danger notification:"
        >
          {#snippet children()}
            <Dropdown
              onSelect={onSelect}
              isOpen={isOpen3}
              onOpenChange={onOpenChange(3)}
              toggle={toggle3}
            >
              {#snippet children()}
                <DropdownList>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem
                    to="#default-link2"
                    onClick={(ev) => ev.preventDefault()}
                  >
                    Link
                  </DropdownItem>
                  <DropdownItem isDisabled>Disabled Action</DropdownItem>
                  <DropdownItem isDisabled to="#default-link4">
                    Disabled Link
                  </DropdownItem>
                </DropdownList>
              {/snippet}
            </Dropdown>
          {/snippet}
        </NotificationDrawerListItemHeader>
        <NotificationDrawerListItemBody timestamp="10 minutes ago">
          This is a danger notification description. This is a long description to show how the title will wrap if
          it is long and wraps to multiple lines.
        </NotificationDrawerListItemBody>
      </NotificationDrawerListItem>

      <NotificationDrawerListItem variant="warning" isRead>
        <NotificationDrawerListItemHeader
          variant="warning"
          title="Read warning notification title"
          srTitle="Warning notification:"
        >
          {#snippet children()}
            <Dropdown
              onSelect={onSelect}
              isOpen={isOpen4}
              onOpenChange={onOpenChange(4)}
              toggle={toggle4}
            >
              {#snippet children()}
                <DropdownList>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem
                    to="#default-link2"
                    onClick={(ev) => ev.preventDefault()}
                  >
                    Link
                  </DropdownItem>
                  <DropdownItem isDisabled>Disabled Action</DropdownItem>
                  <DropdownItem isDisabled to="#default-link4">
                    Disabled Link
                  </DropdownItem>
                </DropdownList>
              {/snippet}
            </Dropdown>
          {/snippet}
        </NotificationDrawerListItemHeader>
        <NotificationDrawerListItemBody timestamp="20 minutes ago">
          This is a warning notification description.
        </NotificationDrawerListItemBody>
      </NotificationDrawerListItem>

      <NotificationDrawerListItem variant="success" isRead>
        <NotificationDrawerListItemHeader
          variant="success"
          title="Read success notification title"
          srTitle="Success notification:"
        >
          {#snippet children()}
            <Dropdown
              onSelect={onSelect}
              isOpen={isOpen5}
              onOpenChange={onOpenChange(5)}
              toggle={toggle5}
            >
              {#snippet children()}
                <DropdownList>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem
                    to="#default-link2"
                    onClick={(ev) => ev.preventDefault()}
                  >
                    Link
                  </DropdownItem>
                  <DropdownItem isDisabled>Disabled Action</DropdownItem>
                  <DropdownItem isDisabled to="#default-link4">
                    Disabled Link
                  </DropdownItem>
                </DropdownList>
              {/snippet}
            </Dropdown>
          {/snippet}
        </NotificationDrawerListItemHeader>
        <NotificationDrawerListItemBody timestamp="30 minutes ago">
          This is a success notification description.
        </NotificationDrawerListItemBody>
      </NotificationDrawerListItem>

      <NotificationDrawerListItem isRead>
        <NotificationDrawerListItemHeader title="Read (default) notification title" srTitle="notification:">
          {#snippet children()}
            <Dropdown
              onSelect={onSelect}
              isOpen={isOpen6}
              onOpenChange={onOpenChange(6)}
              toggle={toggle6}
            >
              {#snippet children()}
                <DropdownList>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem
                    to="#default-link2"
                    onClick={(ev) => ev.preventDefault()}
                  >
                    Link
                  </DropdownItem>
                  <DropdownItem isDisabled>Disabled Action</DropdownItem>
                  <DropdownItem isDisabled to="#default-link4">
                    Disabled Link
                  </DropdownItem>
                </DropdownList>
              {/snippet}
            </Dropdown>
          {/snippet}
        </NotificationDrawerListItemHeader>
        <NotificationDrawerListItemBody timestamp="35 minutes ago">
          This is a default notification description.
        </NotificationDrawerListItemBody>
      </NotificationDrawerListItem>
    </NotificationDrawerList>
  </NotificationDrawerBody>
</NotificationDrawer>
