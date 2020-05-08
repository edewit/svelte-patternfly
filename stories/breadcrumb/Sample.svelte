<script>
  import { Breadcrumb, BreadcrumbItem } from "svelte-patternfly";
</script>

<Breadcrumb>
  <BreadcrumbItem to="#">Section home</BreadcrumbItem>
  <BreadcrumbItem to="#">Section title</BreadcrumbItem>
  <BreadcrumbItem to="#">Section title</BreadcrumbItem>
  <BreadcrumbItem to="#" isActive>
    Section Landing
  </BreadcrumbItem>
</Breadcrumb>

