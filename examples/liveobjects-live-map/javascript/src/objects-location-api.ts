import {} from 'ably'; // import statement so TS does not complain about missing ably types

// Force Location API interfaces. This example won't provide support for user provided types, but it can be extended to do so.
declare module 'ably' {
  type LeafValue = string | number | boolean | Buffer | ArrayBuffer | LiveMap<LiveMapType> | LiveCounter;
  type LeafValueOrStruct = LeafValue | LiveMapStruct | LiveCounterStruct;

  interface Objects {
    getRoot(): Promise<RootLocationObject>;
  }

  interface LocationObject {
    /** The path this location refers to (dot notation or optionally we can return a path array) */
    readonly path: string;

    /**
     * Resolves the current value at this location.
     * If this location points to a LiveCounter, this returns the counter value.
     * If this location points to a LiveMap key, this returns a value for that key.
     * If this location points to an index in a LiveList, this returns a value for that index.
     */
    value(): LeafValue | undefined;

    /** Returns the current object instance at this location, if it exists */
    getObject(): LiveMap<LiveMapType> | LiveCounter | undefined;

    /** Get a LocationObject for a path. Can support dot notation or a path array for better type safety */
    get(path: string): LocationObject;

    /** Replaces or creates an object at this location */
    upsert(value: LiveMap<LiveMapType> | LiveCounter | LiveMapStruct | LiveCounterStruct): Promise<void>;

    /** Subscribes to data updates at this location */
    subscribe(callback: LocationSubscriptionCallback): UnsubscribeFn;

    /** Observe lifecycle events such as deletion */
    on(event: 'deleted', callback: () => void): UnsubscribeFn;

    // OPTIONALLY
    /** Delete the object at this location, if it exists */
    delete(): Promise<void>;

    /** Type assertions with runtime validation */
    asMap(): MapLocationObject;
    asCounter(): CounterLocationObject;
  }

  interface LocationUpdate<T = unknown> {
    type: string; // the type of object, 'LiveMap', 'LiveCounter', etc.
    path: string; // Resolved absolute path
    location: LocationObject; // LocationObject pointing to this path
    node: T; // updated LiveObject instance
    update: unknown; // update payload
  }

  type LocationSubscriptionCallback<T = LiveMap<LiveMapType> | LiveCounter> = (update: LocationUpdate<T>) => void;

  type UnsubscribeFn = () => void;

  interface MapLocationObject extends LocationObject {
    // get() is already available on LocationObject, so need to expose only other LiveMap methods

    size(): number; // number of keys in a map
    entries(): IterableIterator<[string, LeafValue]>; // iterate over all entries in a map
    keys(): IterableIterator<string>; // iterate over all keys in a map
    values(): IterableIterator<LeafValue>; // iterate over all values in a map
    set(key: string, value: LeafValueOrStruct): Promise<void>; // set a value for a key
    remove(key: string): Promise<void>; // remove a key from a map
  }

  interface CounterLocationObject extends LocationObject {
    value(): number; // get the current counter value
    increment(amount: number): Promise<void>;
    decrement(amount: number): Promise<void>;
  }

  interface RootLocationObject extends MapLocationObject {
    /** Set default value for a root object */
    default(entries: { [key: string]: LeafValueOrStruct }): Promise<void>;
  }

  class LiveMap<T extends LiveMapType> implements LiveObject<LiveMapUpdate<T>> {
    static struct(entries?: { [key: string]: LeafValueOrStruct }): LiveMapStruct;
  }

  class LiveCounter implements LiveObject<LiveCounterUpdate> {
    static struct(count?: number): LiveCounterStruct;
  }

  interface LiveMapStruct {}
  interface LiveCounterStruct {}
}
