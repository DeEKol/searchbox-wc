<script>
  import Widget from "./components/Widget.svelte";

  customElements.define("widget-wc", Widget.element);

  let citiesFetch = []
  async function logMovies() {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities/filter", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "limit": 10,
      }),
    });
    const result = await response.json();
    result.data.forEach((elem) => {
      citiesFetch.push(`${elem.country}, ${elem.city}`)
    })
    document.querySelector("widget-wc").cities = citiesFetch;
    return result;
  }
  logMovies();

  document.body.innerHTML = `
	<widget-wc>
	</widget-wc>
`;

  document.querySelector("widget-wc").addEventListener("search", function(event) {
    console.log(event);
    console.log(event.dataForm)
  });
</script>