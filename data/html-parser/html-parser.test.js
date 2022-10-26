import * as fc from 'fast-check';
import { cheerioNodeParser, htmlParser } from '.';
import htmlString from '../../test-generators.js/html';
import HtmlDataTypes from '../types/html';

const buildExpectedFromTagArray = (tagArray, innerText) =>
  tagArray.length === 0
    ? [
        {
          data: innerText,
          type: HtmlDataTypes.text,
          name: HtmlDataTypes.text,
        },
      ]
    : [
        {
          data: buildExpectedFromTagArray(tagArray.slice(1), innerText),
          type: HtmlDataTypes.tag,
          name: tagArray[0],
          attribs: Object.create(null),
        },
      ];

describe('Cheerio node parser transforms data as expected', () => {
  it('A single text node has no attributes', () => {
    const input = {
      children: [],
      attribs: {},
      data: 'Lorem ipsum dolor sit mae adipiscing color',
      name: HtmlDataTypes.text,
      type: HtmlDataTypes.text,
    };
    const expected = {
      data: 'Lorem ipsum dolor sit mae adipiscing color',
      name: HtmlDataTypes.text,
      type: HtmlDataTypes.text,
    };
    const actual = cheerioNodeParser(null, input);
    expect(actual).toEqual(expected);
  });
  it('A node with children has them moved into the data property', () => {
    const input = {
      children: [
        {
          children: [],
          attribs: {},
          data: 'Lorem ipsum dolor sit mae adipiscing color',
          name: 'text',
          type: 'text',
        },
      ],
      attribs: {},
      type: HtmlDataTypes.tag,
      name: HtmlDataTypes.p,
    };
    const expected = {
      data: [
        {
          data: 'Lorem ipsum dolor sit mae adipiscing color',
          name: 'text',
          type: 'text',
        },
      ],
      type: HtmlDataTypes.tag,
      name: HtmlDataTypes.p,
      attribs: {},
    };
    const actual = cheerioNodeParser(null, input);
    expect(actual).toEqual(expected);
  });
});

describe('HTML parsing into data objects works as expected', () => {
  // The behaviour of invalid HTML is defined by Cheerio and beyond the scope of this testing suite unless specific examples cause issues.
  it('A specific, known-valid piece of HTML is capable of being interpreted into data objects in the correct format by the HTML parser', () => {
    const validHtml =
      '<p>Lorem ipsum dolor sit mae adipiscing color</p>' +
      '<p>insertium paragraphicus <strong>loremitor</strong></p>' +
      '<div><span>A good example of some common text</span> with text both in and out of elements.</div>';
    const expected = [
      {
        attribs: {},
        data: [
          {
            data: 'Lorem ipsum dolor sit mae adipiscing color',
            name: 'text',
            type: 'text',
          },
        ],
        name: 'p',
        type: 'tag',
      },
      {
        attribs: {},
        data: [
          {
            data: 'insertium paragraphicus ',
            name: 'text',
            type: 'text',
          },
          {
            attribs: {},
            data: [
              {
                data: 'loremitor',
                name: 'text',
                type: 'text',
              },
            ],
            name: 'strong',
            type: 'tag',
          },
        ],
        name: 'p',
        type: 'tag',
      },
      {
        attribs: {},
        data: [
          {
            attribs: {},
            data: [
              {
                data: 'A good example of some common text',
                name: 'text',
                type: 'text',
              },
            ],
            name: 'span',
            type: 'tag',
          },
          {
            data: ' with text both in and out of elements.',
            name: 'text',
            type: 'text',
          },
        ],
        name: 'div',
        type: 'tag',
      },
    ];
    const [{ data: actual }] = htmlParser(validHtml);
    expect(actual).toEqual(expected);
  });

  it('Arbitrary valid HTML is capable of being interpreted into data objects in the correct format by the HTML parser', () => {
    fc.assert(
      fc.property(htmlString, ({ result, tagResult, innerText }) => {
        const [{ data: actual }] = htmlParser(result);
        const expected = buildExpectedFromTagArray(tagResult, innerText);
        expect(actual).toEqual(expected);
      }),
    );
  });

  it.only('renders blockquote correctly', () => {
    const htmlString = `
    <div lang=\\"objc,swift,csharp\\"></div>
    <div lang=\\"default\\">
    <blockquote class=\\"definition\\" id=\\"subscribe-event-array\\">
    <p class=\\"definition\\"><span lang=\\"default\\">subscribe(String[] <a href=\\"#presence-action\\">actions</a>, listener(<a href=\\"#presence-message))\\">PresenceMessage</a></span><span lang=\\"java\\">void subscribe(<a href=\\"#presence-action\\">PresenceMessage.Action[]</a> actions, <a href=\\"#presence-listener\\">PresenceListener</a> listener)</span><span lang=\\"ruby\\">subscribe(<a href=\\"#presence-action\\">PresenceMessage::ACTION</a> *actions) → yields <a href=\\"#presence-message\\">PresenceMessage</a></span></p>
    </blockquote>
    <p>Subscribe a single listener to messages on this channel for multiple <code>name</code> values.</p>
    </div>
  `;
    const [{ data: actual }] = htmlParser(htmlString);
    expect(actual).toMatchInlineSnapshot(`
      Array [
        Object {
          "attribs": Object {
            "lang": "csharp\\\\\\"",
          },
          "data": Array [],
          "name": "div",
          "type": "tag",
        },
        Object {
          "attribs": Object {
            "lang": "swift",
          },
          "data": Array [],
          "name": "div",
          "type": "tag",
        },
        Object {
          "attribs": Object {
            "lang": "\\\\\\"objc",
          },
          "data": Array [],
          "name": "div",
          "type": "tag",
        },
        Object {
          "attribs": Object {
            "lang": "\\\\\\"default\\\\\\"",
          },
          "data": Array [
            Object {
              "data": "
          ",
              "name": "text",
              "type": "text",
            },
            Object {
              "attribs": Object {
                "class": "\\\\\\"definition\\\\\\"",
                "id": "\\\\\\"subscribe-event-array\\\\\\"",
              },
              "data": Array [
                Object {
                  "data": "
          ",
                  "name": "text",
                  "type": "text",
                },
                Object {
                  "attribs": Object {
                    "class": "\\\\\\"definition\\\\\\"",
                  },
                  "data": Array [
                    Object {
                      "attribs": Object {
                        "lang": "\\\\\\"default\\\\\\"",
                      },
                      "data": Array [
                        Object {
                          "data": "subscribe(String[] ",
                          "name": "text",
                          "type": "text",
                        },
                        Object {
                          "attribs": Object {
                            "href": "\\\\\\"#presence-action\\\\\\"",
                          },
                          "data": Array [
                            Object {
                              "data": "actions",
                              "name": "text",
                              "type": "text",
                            },
                          ],
                          "name": "a",
                          "type": "tag",
                        },
                        Object {
                          "data": ", listener(",
                          "name": "text",
                          "type": "text",
                        },
                        Object {
                          "attribs": Object {
                            "href": "\\\\\\"#presence-message))\\\\\\"",
                          },
                          "data": Array [
                            Object {
                              "data": "PresenceMessage",
                              "name": "text",
                              "type": "text",
                            },
                          ],
                          "name": "a",
                          "type": "tag",
                        },
                      ],
                      "name": "span",
                      "type": "tag",
                    },
                    Object {
                      "attribs": Object {
                        "lang": "\\\\\\"java\\\\\\"",
                      },
                      "data": Array [
                        Object {
                          "data": "void subscribe(",
                          "name": "text",
                          "type": "text",
                        },
                        Object {
                          "attribs": Object {
                            "href": "\\\\\\"#presence-action\\\\\\"",
                          },
                          "data": Array [
                            Object {
                              "data": "PresenceMessage.Action[]",
                              "name": "text",
                              "type": "text",
                            },
                          ],
                          "name": "a",
                          "type": "tag",
                        },
                        Object {
                          "data": " actions, ",
                          "name": "text",
                          "type": "text",
                        },
                        Object {
                          "attribs": Object {
                            "href": "\\\\\\"#presence-listener\\\\\\"",
                          },
                          "data": Array [
                            Object {
                              "data": "PresenceListener",
                              "name": "text",
                              "type": "text",
                            },
                          ],
                          "name": "a",
                          "type": "tag",
                        },
                        Object {
                          "data": " listener)",
                          "name": "text",
                          "type": "text",
                        },
                      ],
                      "name": "span",
                      "type": "tag",
                    },
                    Object {
                      "attribs": Object {
                        "lang": "\\\\\\"ruby\\\\\\"",
                      },
                      "data": Array [
                        Object {
                          "data": "subscribe(",
                          "name": "text",
                          "type": "text",
                        },
                        Object {
                          "attribs": Object {
                            "href": "\\\\\\"#presence-action\\\\\\"",
                          },
                          "data": Array [
                            Object {
                              "data": "PresenceMessage::ACTION",
                              "name": "text",
                              "type": "text",
                            },
                          ],
                          "name": "a",
                          "type": "tag",
                        },
                        Object {
                          "data": " *actions) → yields ",
                          "name": "text",
                          "type": "text",
                        },
                        Object {
                          "attribs": Object {
                            "href": "\\\\\\"#presence-message\\\\\\"",
                          },
                          "data": Array [
                            Object {
                              "data": "PresenceMessage",
                              "name": "text",
                              "type": "text",
                            },
                          ],
                          "name": "a",
                          "type": "tag",
                        },
                      ],
                      "name": "span",
                      "type": "tag",
                    },
                  ],
                  "name": "p",
                  "type": "tag",
                },
                Object {
                  "data": "
          ",
                  "name": "text",
                  "type": "text",
                },
              ],
              "name": "blockquote",
              "type": "tag",
            },
            Object {
              "data": "
          ",
              "name": "text",
              "type": "text",
            },
            Object {
              "attribs": Object {},
              "data": Array [
                Object {
                  "data": "Subscribe a single listener to messages on this channel for multiple ",
                  "name": "text",
                  "type": "text",
                },
                Object {
                  "attribs": Object {},
                  "data": Array [
                    Object {
                      "data": "name",
                      "name": "text",
                      "type": "text",
                    },
                  ],
                  "name": "code",
                  "type": "tag",
                },
                Object {
                  "data": " values.",
                  "name": "text",
                  "type": "text",
                },
              ],
              "name": "p",
              "type": "tag",
            },
            Object {
              "data": "
          ",
              "name": "text",
              "type": "text",
            },
          ],
          "name": "div",
          "type": "tag",
        },
      ]
    `);
  });
});
