type Store = {
  getState: () => Record<
    string,
    {
      data: Record<string, unknown>;
    }
  >;
  dispatch: (options: { type: string; payload: Record<string, unknown> }) => void;
};

type selector = (store: Store) => Record<string, unknown>;

type connectState = (selector: selector, setState: Dispatch<SetStateAction<S>>) => void;
