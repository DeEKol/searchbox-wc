<script>
  import Widget from "./components/Widget.svelte";

  customElements.define('widget-wc', Widget.element);

  const name = "che"

  const cities = [
      "Ekaterinburgsssasdsfssdasd",
      "Chelyabinsk",
  ]

  document.body.innerHTML = `
	<widget-wc cities=${cities}>
	</widget-wc>
`;
</script>


<style>
    .p {
        color: green;
    }
  /*.logo {*/
  /*  height: 6em;*/
  /*  padding: 1.5em;*/
  /*  will-change: filter;*/
  /*  transition: filter 300ms;*/
  /*}*/
  /*.logo:hover {*/
  /*  filter: drop-shadow(0 0 2em #646cffaa);*/
  /*}*/
  /*.logo.svelte:hover {*/
  /*  filter: drop-shadow(0 0 2em #ff3e00aa);*/
  /*}*/
  /*.read-the-docs {*/
  /*  color: #888;*/
  /*}*/
</style>
