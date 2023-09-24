<script>
  import Widget from "./components/Widget.svelte";

  customElements.define("widget-wc", Widget.element);

  const cities = [
      "Ekaterinburgsssasdsfssdasdfasfafsaf",
      "Chelyabinsk",
    "Tumen",
    "Moscow",
    "Spb",
  ]

  document.body.innerHTML = `
	<widget-wc cities=${cities}>
	</widget-wc>
`;

  document.querySelector("widget-wc").addEventListener("search", function(event) {
    console.log(event);
    console.log(event.dataForm)
  });
</script>