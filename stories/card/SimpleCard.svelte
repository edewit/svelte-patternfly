<script>
  import { Card, CardTitle, CardBody, CardFooter } from 'svelte-patternfly';
</script>

<Card>
  <CardTitle>Header</CardTitle>
  <CardBody>Body</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>

<br />

<Card>
  <CardBody>With only a body</CardBody>
</Card>

<br />

<Card>
  <CardTitle>Header</CardTitle>
  <CardBody>Multiple Bodies</CardBody>
  <CardBody>Body</CardBody>
  <CardBody>Body</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>

<br />

<Card style="min-height: 20em">
  <CardTitle>Header</CardTitle>
  <CardBody isFilled={false}>Body pf-m-no-fill</CardBody>
  <CardBody isFilled={false}>Body pf-m-no-fill</CardBody>
  <CardBody>Body</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>

<br />

<Card isCompact>
  <CardTitle>Compact Card</CardTitle>
  <CardBody>Body</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>

<br />

<Card isFlat>
  <CardTitle>Flat Card</CardTitle>
  <CardBody>Body</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>

