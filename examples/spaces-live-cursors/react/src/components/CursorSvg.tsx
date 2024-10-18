const CursorSvg = ({ cursorColor }: { cursorColor: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
    >
      <path
        d="M0.22033 3.02709L4.59403 17.4603C5.06656 19.0196 7.05862 19.4688 8.15466 18.2632L16.9021 8.64108C17.9041 7.5388 17.4704 5.7725 16.0718 5.25966L2.95072 0.4486C1.32539 -0.147356 -0.281717 1.37034 0.22033 3.02709Z"
        fill={cursorColor}
      />
    </svg>
  );
};

export default CursorSvg;