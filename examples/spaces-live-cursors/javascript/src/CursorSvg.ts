export const createCursorSvg = (cursorColor: string): SVGElement => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '19');
    svg.setAttribute('viewBox', '0 0 18 19');
    svg.setAttribute('fill', 'none');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M0.22033 3.02709L4.59403 17.4603C5.06656 19.0196 7.05862 19.4688 8.15466 18.2632L16.9021 8.64108C17.9041 7.5388 17.4704 5.7725 16.0718 5.25966L2.95072 0.4486C1.32539 -0.147356 -0.281717 1.37034 0.22033 3.02709Z');
    path.setAttribute('fill', cursorColor);
    svg.appendChild(path);
    return svg;
  };