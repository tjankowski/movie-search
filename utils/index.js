export function updateUrlQuery(value) {
  const url = new URL(window.location.href);
  url.searchParams.set("query", value);
  window.history.pushState(
    { path: url.toString() },
    document.title,
    url.toString()
  );
}

export function union(...classes) {
  return classes.join(" ");
}
