import { addHyphenListSupport } from './add-hyphen-list-support';

describe('Add support for hyphen-led lists in textile-js', () => {
  it('Replaces hyphens followed by at least one space with asterisks followed by at least one space', () => {
    expect(
      addHyphenListSupport(
        `- Item one
- Item two
- Item three`,
      ),
    ).toBe(`* Item one
* Item two
* Item three`);
  });
  it('Replaces hyphens in a real world example', () => {
    expect(
      addHyphenListSupport(
        `- *Active traffic management*: Let Ably actively monitor not only the global cluster health but also your own endpoints and proactively take steps to isolate or move traffic to ensure business continuity.
- *Dedicated, isolated clusters*: Rely upon guaranteed capacity and isolation from noisy neighbors.
- *Regional routing of traffic*: Require that all traffic is routed and serviced within specific regions.
- *Regional message storage*: Require that all messages are stored within a specific region.`,
      ),
    )
      .toBe(`* *Active traffic management*: Let Ably actively monitor not only the global cluster health but also your own endpoints and proactively take steps to isolate or move traffic to ensure business continuity.
* *Dedicated, isolated clusters*: Rely upon guaranteed capacity and isolation from noisy neighbors.
* *Regional routing of traffic*: Require that all traffic is routed and serviced within specific regions.
* *Regional message storage*: Require that all messages are stored within a specific region.`);
  });
  it('Does not affect definition lists', () => {
    expect(
      addHyphenListSupport(`- *Active traffic management*:= Let Ably actively monitor not only the global cluster health but also your own endpoints and proactively take steps to isolate or move traffic to ensure business continuity.
- *Dedicated, isolated clusters*:= Rely upon guaranteed capacity and isolation from noisy neighbors.
- *Regional routing of traffic*:= Require that all traffic is routed and serviced within specific regions.
- *Regional message storage*:= Require that all messages are stored within a specific region.`),
    )
      .toBe(`- *Active traffic management*:= Let Ably actively monitor not only the global cluster health but also your own endpoints and proactively take steps to isolate or move traffic to ensure business continuity.
- *Dedicated, isolated clusters*:= Rely upon guaranteed capacity and isolation from noisy neighbors.
- *Regional routing of traffic*:= Require that all traffic is routed and serviced within specific regions.
- *Regional message storage*:= Require that all messages are stored within a specific region.`);
  });
});
