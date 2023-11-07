export const shouldRunPublisher = () => {
  const url = new URL(window.location.href);
  const publisherInParams = url.searchParams.get("publisher");

  return publisherInParams !== 'false';
}
