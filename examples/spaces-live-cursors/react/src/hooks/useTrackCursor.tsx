import { useEffect } from "react";
import { useCursors } from "@ably/spaces/react";

// 💡 This hook is used to get the cursor position of the user and update the cursor position in the space
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
  let handleSelfCursorMove: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void = () => {};

  useEffect(() => {
    if (!set) return;
    const container = document.querySelector("#live-cursors")! as HTMLElement;

    // 💡 This function is used to update the cursor position in the space
    const handleSelfCursorMove = (e: MouseEvent) => {
      if (!document.hasFocus()) return;

      const liveCursorsDiv = parentRef.current;
      const bounds = liveCursorsDiv?.getBoundingClientRect();
      if (!bounds) return;
      let relativeLeftPosition = e.clientX - bounds.left;
      let relativeTopPosition = e.clientY - bounds.top;
      if (e.clientX < bounds.left) relativeLeftPosition = -100;
      if (e.clientX > bounds.right) relativeLeftPosition = bounds.right;
      if (e.clientY < bounds.top) relativeTopPosition = -100;
      if (e.clientY > bounds.bottom) relativeTopPosition = bounds.bottom;

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

    const handleSelfCursorLeave = (e: MouseEvent) => {
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
  }, [set]);

  return handleSelfCursorMove;
};

export default useTrackCursor;