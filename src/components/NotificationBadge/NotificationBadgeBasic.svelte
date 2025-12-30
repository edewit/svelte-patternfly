<script lang="ts">
  import NotificationBadge from './NotificationBadge.svelte';

  let readExpanded = $state(false);
  let unreadExpanded = $state(false);
  let attentionExpanded = $state(false);

  function onReadClick() {
    readExpanded = !readExpanded;
  }

  function onUnreadClick() {
    unreadExpanded = !unreadExpanded;
  }

  function onAttentionClick() {
    attentionExpanded = !attentionExpanded;
  }
</script>

<NotificationBadge
  variant="read"
  onClick={onReadClick}
  aria-label="Basic notification badge with read variant"
  isExpanded={readExpanded}
/>

<NotificationBadge
  variant="unread"
  onClick={onUnreadClick}
  aria-label="Basic notification badge with unread variant"
  isExpanded={unreadExpanded}
/>

<NotificationBadge
  variant="attention"
  onClick={onAttentionClick}
  aria-label="Basic notification badge with attention variant"
  isExpanded={attentionExpanded}
/>

