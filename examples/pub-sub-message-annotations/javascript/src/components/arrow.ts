// Creates and manages SVG arrow icons for dropdown interactions

export function createDropdownArrow(color: string) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', `h-4 w-4 text-${color}-500 transform transition-transform duration-200`);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('stroke', 'currentColor');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('d', 'M19 9l-7 7-7-7');

  svg.appendChild(path);
  return svg;
}

export function rotateArrow(arrow: SVGElement, expanded: boolean) {
  if (expanded) {
    arrow.classList.add('rotate-180');
  } else {
    arrow.classList.remove('rotate-180');
  }
}

export function toggleArrowRotation(arrow: SVGElement) {
  arrow.classList.toggle('rotate-180');
  return arrow.classList.contains('rotate-180');
}
