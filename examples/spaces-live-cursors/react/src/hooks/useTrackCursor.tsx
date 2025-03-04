import { useEffect } from "react";
import { useCursors } from "@ably/spaces/react";

const useTrackCursor = (
  setCursorPosition: ({
    left,
    top,
    state,
  }: {
    left: number;
    top: number;
    state: string;
  }) => void,
  parentRef: React.RefObject<HTMLDivElement>,
) => {
  const { set } = useCursors();

  useEffect(() => {
    if (!set) return;
    const container = document.querySelector("#live-cursors")! as HTMLElement;

    const handleSelfCursorMove = (e: MouseEvent) => {
      if (!document.hasFocus()) return;

      const bounds = container.getBoundingClientRect();
      if (!bounds) return;

      const relativeLeftPosition = e.clientX - bounds.left;
      const relativeTopPosition = e.clientY - bounds.top;

      setCursorPosition({
        left: relativeLeftPosition,
        top: relativeTopPosition,
        state: "move",
      });

      set({
        position: { x: relativeLeftPosition, y: relativeTopPosition },
        data: { state: "move" },
      });
    };

    const handleSelfCursorLeave = () => {
      setCursorPosition({
        left: 0,
        top: 0,
        state: "leave",
      });

      set({
        position: { x: 0, y: 0 },
        data: { state: "leave" },
      });
    };

    container.addEventListener("mousemove", handleSelfCursorMove);
    container.addEventListener("mouseleave", handleSelfCursorLeave);

    return () => {
      container.removeEventListener("mousemove", handleSelfCursorMove);
      container.removeEventListener("mouseleave", handleSelfCursorLeave);
    };
  }, [set, parentRef]);

  return () => {};
};

export default useTrackCursor;
