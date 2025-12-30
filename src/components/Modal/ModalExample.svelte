<script lang="ts">
  import Modal from './Modal.svelte';
  import ModalHeader from './ModalHeader.svelte';
  import ModalBody from './ModalBody.svelte';
  import ModalFooter from './ModalFooter.svelte';
  import Button from '../Button/Button.svelte';

  export interface Props {
    variant?: 'basic' | 'small' | 'medium' | 'large' | 'custom-width' | 'top-aligned' | 'no-header-footer' | 'title-icon' | 'custom-title-icon' | 'scrollable';
    isOpen?: boolean;
  }

  let {
    variant = 'basic',
    isOpen: isOpenProp
  }: Props = $props();

  let isOpen = $state(isOpenProp ?? false);

  // Sync with props
  $effect(() => {
    if (isOpenProp !== undefined) {
      isOpen = isOpenProp;
    }
  });

  function handleModalToggle(event?: KeyboardEvent | MouseEvent) {
    isOpen = !isOpen;
  }

  const longContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.';
</script>

<Button variant="primary" onclick={handleModalToggle} ouiaId="ShowBasicModal">
  Show modal
</Button>

{#if variant === 'basic'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    ouiaId="BasicModal"
    aria-labelledby="basic-modal-title"
    aria-describedby="modal-box-body-basic"
  >
    <ModalHeader title="Basic modal" labelId="basic-modal-title" />
    <ModalBody id="modal-box-body-basic">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </ModalBody>
    <ModalFooter>
      <Button key="confirm" variant="primary" onclick={handleModalToggle}>
        Confirm
      </Button>
      <Button key="cancel" variant="link" onclick={handleModalToggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'small'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    variant="small"
    aria-labelledby="small-modal-title"
    aria-describedby="modal-box-body-small"
  >
    <ModalHeader title="Small modal" labelId="small-modal-title" />
    <ModalBody id="modal-box-body-small">
      This is a small modal.
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'medium'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    variant="medium"
    aria-labelledby="medium-modal-title"
    aria-describedby="modal-box-body-medium"
  >
    <ModalHeader title="Medium modal" labelId="medium-modal-title" />
    <ModalBody id="modal-box-body-medium">
      This is a medium modal.
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'large'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    variant="large"
    aria-labelledby="large-modal-title"
    aria-describedby="modal-box-body-large"
  >
    <ModalHeader title="Large modal" labelId="large-modal-title" />
    <ModalBody id="modal-box-body-large">
      This is a large modal with more content.
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'custom-width'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    width="50%"
    aria-labelledby="custom-width-modal-title"
    aria-describedby="modal-box-body-custom-width"
  >
    <ModalHeader title="Custom width modal" labelId="custom-width-modal-title" />
    <ModalBody id="modal-box-body-custom-width">
      This modal has a custom width of 50%.
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'top-aligned'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    position="top"
    aria-labelledby="top-modal-title"
    aria-describedby="modal-box-body-top"
  >
    <ModalHeader title="Top aligned modal" labelId="top-modal-title" />
    <ModalBody id="modal-box-body-top">
      This modal is aligned to the top of the screen.
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'no-header-footer'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    aria-label="Modal with no header or footer"
    showClose={false}
  >
    <ModalBody>
      This modal has no header or footer.
    </ModalBody>
  </Modal>
{:else if variant === 'title-icon'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    aria-labelledby="icon-modal-title"
    aria-describedby="modal-box-body-icon"
  >
    <ModalHeader title="Warning modal" labelId="icon-modal-title" titleIconVariant="warning" />
    <ModalBody id="modal-box-body-icon">
      This modal has a warning icon in the title.
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'custom-title-icon'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    aria-labelledby="custom-icon-modal-title"
    aria-describedby="modal-box-body-custom-icon"
  >
    <ModalHeader title="Custom icon modal" labelId="custom-icon-modal-title" titleIconVariant="custom">
      {#snippet children()}
        <h1 class="pf-v6-c-modal-box__title pf-m-custom" id="custom-icon-modal-title">
          <span class="pf-v6-c-modal-box__title-icon">
            <i class="fas fa-bullhorn" aria-hidden="true"></i>
          </span>
          <span class="pf-v6-c-modal-box__title-text">Custom icon modal</span>
        </h1>
      {/snippet}
    </ModalHeader>
    <ModalBody id="modal-box-body-custom-icon">
      This modal has a custom icon in the title.
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{:else if variant === 'scrollable'}
  <Modal
    isOpen={isOpen}
    onClose={handleModalToggle}
    aria-labelledby="scrollable-modal-title"
    aria-describedby="modal-box-body-scrollable"
  >
    <ModalHeader title="Scrollable modal" labelId="scrollable-modal-title" />
    <ModalBody id="modal-box-body-scrollable" tabIndex={0}>
      {longContent}
      {longContent}
      {longContent}
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onclick={handleModalToggle}>Confirm</Button>
      <Button variant="link" onclick={handleModalToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
{/if}

