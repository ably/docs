## 80019: Auth server rejecting request <a id="80019"/>

This error occurs when the client library fails to obtain a token using the client-supplied [`authUrl`](/docs/auth/token/jwt#auth-url) or [`authCallback`](/docs/auth/token/jwt#auth-callback). It is raised when the request to the authentication server fails due to an error or exception in the callback.

If the `authUrl` returns an HTTP 403 response, or an `authCallback` or a token exchange request results in an [`ErrorInfo`](/docs/platform/errors#format) with `statusCode` 403, the SDK transitions the connection to the [`FAILED`](/docs/connect/states#connection-states) state. No further automatic reconnection attempts are made. This behavior is useful when you need to [stop the SDK from retrying](/docs/connect/states#fatal-errors), for example when a user's session has been revoked.

The [`ErrorInfo`](/docs/platform/errors#format) emitted with the state change has `code` 80019 and `statusCode` 403. The underlying cause from the authentication server is available in the `cause` property. The same [`ErrorInfo`](/docs/platform/errors#format) is set as the connection's `errorReason`.