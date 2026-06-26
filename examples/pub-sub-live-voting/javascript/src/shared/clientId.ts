/** ClientId format: `${name}-${random4}`. The random suffix keeps clientIds
 *  (and therefore votes) distinct even when two people pick the same username.
 *
 *  The clientId matters: votes are `unique` annotations, which Ably dedupes
 *  per clientId. One clientId means one counted vote, no matter how many times
 *  that client taps. */
export function voterClientId(name: string): string {
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${name}-${suffix}`;
}

/** Strip the trailing `-suffix` to get a presentable display name. */
export function displayName(clientId: string): string {
  const lastDash = clientId.lastIndexOf('-');
  return lastDash > 0 ? clientId.slice(0, lastDash) : clientId;
}
