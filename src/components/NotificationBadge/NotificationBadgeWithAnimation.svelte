<script lang="ts">
  import NotificationBadge from './NotificationBadge.svelte';
  import Button from '../Button/Button.svelte';

  let notificationCount = $state(0);
  let shouldNotify = $state(false);

  function addNotification() {
    notificationCount++;
    shouldNotify = true;
    // Reset shouldNotify after a brief moment to allow animation to trigger again
    setTimeout(() => {
      shouldNotify = false;
    }, 100);
  }

  function handleAnimationEnd() {
    shouldNotify = false;
  }
</script>

<div style="display: flex; gap: 1rem; align-items: center;">
  <NotificationBadge
    variant="read"
    aria-label="Notification badge with read variant and no count"
    isExpanded={false}
    shouldNotify={shouldNotify && notificationCount > 0}
    onAnimationEnd={handleAnimationEnd}
  />

  <NotificationBadge
    variant="unread"
    count={notificationCount}
    aria-label="Notification badge animation with unread variant and count"
    isExpanded={false}
    shouldNotify={shouldNotify && notificationCount > 0}
    onAnimationEnd={handleAnimationEnd}
  />

  <NotificationBadge
    variant="attention"
    count={notificationCount}
    aria-label="Notification badge animation with attention variant and count"
    isExpanded={false}
    shouldNotify={shouldNotify && notificationCount > 0}
    onAnimationEnd={handleAnimationEnd}
  />
</div>

<div style="margin-top: 1rem;">
  <Button variant="primary" onClick={addNotification}>Add Notification</Button>
</div>

