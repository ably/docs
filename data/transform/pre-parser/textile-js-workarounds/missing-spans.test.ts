import { processTextile } from '../../../test-utilities/process-textile';

// Source: _request.textile
const missingSpansFixture = `h4. Parameters

- method := either @get@, @post@, @put@, @patch@ or @delete@.<br>__Type: <span lang="default">String</span><span lang="go,csharp">string</span>__
- path := the path to query.<br>__Type: <span lang="default">String</span><span lang="go,csharp">string</span>__
- params := (optional) any querystring parameters needed.<br>__Type: <span lang="default">Object</span><span lang="go">PaginateParams</span><span lang="csharp">Dictionary<string, string></span>__
- body := (optional; for @post@, @put@ and @patch@ methods) the body of the request, as <span lang="default">anything that can be serialized into JSON, such as an @Object@ or @Array@.</span><span lang="csharp">a JToken.</span><br>__Type: <span lang="default">Serializable</span><span lang="go">interface</span><span lang="csharp">JToken</span>__
- headers := (optional) any headers needed. If provided, these will be mixed in with the default library headers.<br>__Type: <span lang="default">Object</span><span lang="go">http.Header</span><span lang="csharp">Dictionary<string, string></span>__

blang[jsall,objc,swift].
  h4. Callback result

  On successfully receiving a response from Ably, @results@ contains an "<span lang="default">@HttpPaginatedResponse@</span><span lang="objc,swift">@ARTHttpPaginatedResponse@</span>":/api/rest-sdk/types#http-paginated-response containing the @statusCode@ of the response, a @success@ boolean (equivalent to whether the status code is between 200 and 299), @headers@, and an @items@ array containing the current page of results. It supports pagination using "@next@":#paginated-result and "@first@":#paginated-result methods, identically to "@PaginatedResult@":/api/rest-sdk/types#paginated-result.

  On failure to obtain a response, @err@ contains an "@ErrorInfo@":/api/rest-sdk/types#error-info object with an error response as defined in the "Ably REST API":/rest-api#common documentation. (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an HTTP Paginated Response, not an @err@).

blang[java,ruby,php,python].
  h4. Returns

  On successfully receiving a response from Ably, the returned "@HttpPaginatedResponse@":/api/rest-sdk/types#http-paginated-response contains a <span lang="ruby,python">@status_code@</span><span lang="default">@statusCode@</span> and a @success@ boolean, @headers@, and an @items@ array containing the current page of results. It supports pagination using "@next@":#paginated-result and "@first@":#paginated-result methods, identically to "@PaginatedResult@":/api/rest-sdk/types#paginated-result.

  Failure to obtain a response will raise an "@AblyException@":/api/realtime-sdk/types#ably-exception. (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an HTTP Paginated Response, not an exception).

blang[csharp].
  h4. Returns

  The method is asynchronous and return a Task that has to be awaited to get the result.

  On successfully receiving a response from Ably, the returned "@HttpPaginatedResponse@":/api/rest-sdk/types#http-paginated-response containing the @StatusCode@ and a @Success@ boolean, @Headers@, and an @Items@ array containing the current page of results. "@HttpPaginatedResponse@":/api/rest-sdk/types#http-paginated-response supports pagination using "@NextAsync@":#paginated-result and "@FirstAsync@":#paginated-result methods.

  Failure to obtain a response will raise an "@AblyException@":/api/realtime-sdk/types#ably-exception. (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an HTTP Paginated Response, not an exception).
`;

describe('Ensure that there are no missing spans', () => {
  it('Ensures that there are no missing spans for any language', () => {
    expect(processTextile(missingSpansFixture)).toMatchInlineSnapshot(`
      Array [
        <h4>
          Parameters
        </h4>,
        <dl>
          
      	
          <dt>
            method
          </dt>
          
      	
          <dd>
            either 
            <code>
              get
            </code>
            , 
            <code>
              post
            </code>
            , 
            <code>
              put
            </code>
            , 
            <code>
              patch
            </code>
             or 
            <code>
              delete
            </code>
            .
            <br />
            <em
              class="italics"
            >
              Type: 
              <span
                lang="default"
              >
                String
              </span>
              <span
                lang="csharp"
              >
                string
              </span>
              <span
                lang="go"
              >
                string
              </span>
            </em>
          </dd>
          
      	
          <dt>
            path
          </dt>
          
      	
          <dd>
            the path to query.
            <br />
            <em
              class="italics"
            >
              Type: 
              <span
                lang="default"
              >
                String
              </span>
              <span
                lang="csharp"
              >
                string
              </span>
              <span
                lang="go"
              >
                string
              </span>
            </em>
          </dd>
          
      	
          <dt>
            params
          </dt>
          
      	
          <dd>
            (optional) any querystring parameters needed.
            <br />
            <em
              class="italics"
            >
              Type: 
              <span
                lang="default"
              >
                Object
              </span>
              <span
                lang="go"
              >
                PaginateParams
              </span>
              <span
                lang="csharp"
              >
                Dictionary&lt;string, string&gt;
              </span>
            </em>
          </dd>
          
      	
          <dt>
            body
          </dt>
          
      	
          <dd>
            (optional; for 
            <code>
              post
            </code>
            , 
            <code>
              put
            </code>
             and 
            <code>
              patch
            </code>
             methods) the body of the request, as 
            <span
              lang="default"
            >
              anything that can be serialized into 
              <span
                class="caps"
              >
                JSON
              </span>
              , such as an 
              <code>
                Object
              </code>
               or 
              <code>
                Array
              </code>
              .
            </span>
            <span
              lang="csharp"
            >
              a JToken.
            </span>
            <br />
            <em
              class="italics"
            >
              Type: 
              <span
                lang="default"
              >
                Serializable
              </span>
              <span
                lang="go"
              >
                interface
              </span>
              <span
                lang="csharp"
              >
                JToken
              </span>
            </em>
          </dd>
          
      	
          <dt>
            headers
          </dt>
          
      	
          <dd>
            (optional) any headers needed. If provided, these will be mixed in with the default library headers.
            <br />
            <em
              class="italics"
            >
              Type: 
              <span
                lang="default"
              >
                Object
              </span>
              <span
                lang="go"
              >
                http.Header
              </span>
              <span
                lang="csharp"
              >
                Dictionary&lt;string, string&gt;
              </span>
            </em>
          </dd>
          

        </dl>,
        <div
          lang="swift"
        >
          <!-- start javascript,nodejs,objc,swift language block -->
          


          <p />
          <h4>
            Callback result
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, 
            <code>
              results
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <span
                lang="default"
              >
                <code>
                  HttpPaginatedResponse
                </code>
              </span>
              <span
                lang="objc,swift"
              >
                <code>
                  ARTHttpPaginatedResponse
                </code>
              </span>
            </a>
             containing the 
            <code>
              statusCode
            </code>
             of the response, a 
            <code>
              success
            </code>
             boolean (equivalent to whether the status code is between 200 and 299), 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            On failure to obtain a response, 
            <code>
              err
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#error-info"
            >
              <code>
                ErrorInfo
              </code>
            </a>
             object with an error response as defined in the 
            <a
              href="/rest-api#common"
            >
              Ably 
              <span
                class="caps"
              >
                REST
              </span>
               
              <span
                class="caps"
              >
                API
              </span>
            </a>
             documentation. (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an 
            <code>
              err
            </code>
            ).
          </p>
        </div>,
        <div
          lang="objc"
        >
          <!-- start javascript,nodejs,objc,swift language block -->
          


          <p />
          <h4>
            Callback result
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, 
            <code>
              results
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <span
                lang="default"
              >
                <code>
                  HttpPaginatedResponse
                </code>
              </span>
              <span
                lang="objc,swift"
              >
                <code>
                  ARTHttpPaginatedResponse
                </code>
              </span>
            </a>
             containing the 
            <code>
              statusCode
            </code>
             of the response, a 
            <code>
              success
            </code>
             boolean (equivalent to whether the status code is between 200 and 299), 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            On failure to obtain a response, 
            <code>
              err
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#error-info"
            >
              <code>
                ErrorInfo
              </code>
            </a>
             object with an error response as defined in the 
            <a
              href="/rest-api#common"
            >
              Ably 
              <span
                class="caps"
              >
                REST
              </span>
               
              <span
                class="caps"
              >
                API
              </span>
            </a>
             documentation. (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an 
            <code>
              err
            </code>
            ).
          </p>
        </div>,
        <div
          lang="nodejs"
        >
          <!-- start javascript,nodejs,objc,swift language block -->
          


          <p />
          <h4>
            Callback result
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, 
            <code>
              results
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <span
                lang="default"
              >
                <code>
                  HttpPaginatedResponse
                </code>
              </span>
              <span
                lang="objc,swift"
              >
                <code>
                  ARTHttpPaginatedResponse
                </code>
              </span>
            </a>
             containing the 
            <code>
              statusCode
            </code>
             of the response, a 
            <code>
              success
            </code>
             boolean (equivalent to whether the status code is between 200 and 299), 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            On failure to obtain a response, 
            <code>
              err
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#error-info"
            >
              <code>
                ErrorInfo
              </code>
            </a>
             object with an error response as defined in the 
            <a
              href="/rest-api#common"
            >
              Ably 
              <span
                class="caps"
              >
                REST
              </span>
               
              <span
                class="caps"
              >
                API
              </span>
            </a>
             documentation. (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an 
            <code>
              err
            </code>
            ).
          </p>
        </div>,
        <div
          lang="javascript"
        >
          <!-- start javascript,nodejs,objc,swift language block -->
          


          <p />
          <h4>
            Callback result
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, 
            <code>
              results
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <span
                lang="default"
              >
                <code>
                  HttpPaginatedResponse
                </code>
              </span>
              <span
                lang="objc,swift"
              >
                <code>
                  ARTHttpPaginatedResponse
                </code>
              </span>
            </a>
             containing the 
            <code>
              statusCode
            </code>
             of the response, a 
            <code>
              success
            </code>
             boolean (equivalent to whether the status code is between 200 and 299), 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            On failure to obtain a response, 
            <code>
              err
            </code>
             contains an 
            <a
              href="/api/rest-sdk/types#error-info"
            >
              <code>
                ErrorInfo
              </code>
            </a>
             object with an error response as defined in the 
            <a
              href="/rest-api#common"
            >
              Ably 
              <span
                class="caps"
              >
                REST
              </span>
               
              <span
                class="caps"
              >
                API
              </span>
            </a>
             documentation. (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an 
            <code>
              err
            </code>
            ).
          </p>
        </div>,
        <div
          lang="python"
        >
          <!-- start java,ruby,php,python language block -->
          


          <p />
          <h4>
            Returns
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, the returned 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <code>
                HttpPaginatedResponse
              </code>
            </a>
             contains a 
            <span
              lang="ruby,python"
            >
              <code>
                status_code
              </code>
            </span>
            <span
              lang="default"
            >
              <code>
                statusCode
              </code>
            </span>
             and a 
            <code>
              success
            </code>
             boolean, 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            Failure to obtain a response will raise an 
            <a
              href="/api/realtime-sdk/types#ably-exception"
            >
              <code>
                AblyException
              </code>
            </a>
            . (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an exception).
          </p>
        </div>,
        <div
          lang="php"
        >
          <!-- start java,ruby,php,python language block -->
          


          <p />
          <h4>
            Returns
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, the returned 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <code>
                HttpPaginatedResponse
              </code>
            </a>
             contains a 
            <span
              lang="ruby,python"
            >
              <code>
                status_code
              </code>
            </span>
            <span
              lang="default"
            >
              <code>
                statusCode
              </code>
            </span>
             and a 
            <code>
              success
            </code>
             boolean, 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            Failure to obtain a response will raise an 
            <a
              href="/api/realtime-sdk/types#ably-exception"
            >
              <code>
                AblyException
              </code>
            </a>
            . (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an exception).
          </p>
        </div>,
        <div
          lang="ruby"
        >
          <!-- start java,ruby,php,python language block -->
          


          <p />
          <h4>
            Returns
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, the returned 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <code>
                HttpPaginatedResponse
              </code>
            </a>
             contains a 
            <span
              lang="ruby,python"
            >
              <code>
                status_code
              </code>
            </span>
            <span
              lang="default"
            >
              <code>
                statusCode
              </code>
            </span>
             and a 
            <code>
              success
            </code>
             boolean, 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            Failure to obtain a response will raise an 
            <a
              href="/api/realtime-sdk/types#ably-exception"
            >
              <code>
                AblyException
              </code>
            </a>
            . (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an exception).
          </p>
        </div>,
        <div
          lang="java"
        >
          <!-- start java,ruby,php,python language block -->
          


          <p />
          <h4>
            Returns
          </h4>
          <p />
          

          <p>
            On successfully receiving a response from Ably, the returned 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <code>
                HttpPaginatedResponse
              </code>
            </a>
             contains a 
            <span
              lang="ruby,python"
            >
              <code>
                status_code
              </code>
            </span>
            <span
              lang="default"
            >
              <code>
                statusCode
              </code>
            </span>
             and a 
            <code>
              success
            </code>
             boolean, 
            <code>
              headers
            </code>
            , and an 
            <code>
              items
            </code>
             array containing the current page of results. It supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                next
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                first
              </code>
            </a>
             methods, identically to 
            <a
              href="/api/rest-sdk/types#paginated-result"
            >
              <code>
                PaginatedResult
              </code>
            </a>
            .
          </p>
          

          <p>
            Failure to obtain a response will raise an 
            <a
              href="/api/realtime-sdk/types#ably-exception"
            >
              <code>
                AblyException
              </code>
            </a>
            . (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an exception).
          </p>
        </div>,
        <div
          lang="csharp"
        >
          <!-- start csharp language block -->
          


          <p />
          <h4>
            Returns
          </h4>
          <p />
          

          <p>
            The method is asynchronous and return a Task that has to be awaited to get the result.
          </p>
          

          <p>
            On successfully receiving a response from Ably, the returned 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <code>
                HttpPaginatedResponse
              </code>
            </a>
             containing the 
            <code>
              StatusCode
            </code>
             and a 
            <code>
              Success
            </code>
             boolean, 
            <code>
              Headers
            </code>
            , and an 
            <code>
              Items
            </code>
             array containing the current page of results. 
            <a
              href="/api/rest-sdk/types#http-paginated-response"
            >
              <code>
                HttpPaginatedResponse
              </code>
            </a>
             supports pagination using 
            <a
              href="#paginated-result"
            >
              <code>
                NextAsync
              </code>
            </a>
             and 
            <a
              href="#paginated-result"
            >
              <code>
                FirstAsync
              </code>
            </a>
             methods.
          </p>
          

          <p>
            Failure to obtain a response will raise an 
            <a
              href="/api/realtime-sdk/types#ably-exception"
            >
              <code>
                AblyException
              </code>
            </a>
            . (Note that if a response is obtained, any response, even with a non-2xx status code, will result in an 
            <span
              class="caps"
            >
              HTTP
            </span>
             Paginated Response, not an exception).
            <br />
          </p>
        </div>,
      ]
    `);
  });
});
