// We are using a React Component here instead of the more efficient static image approach so we can more
// easily/elegantly change the fill color on hover.
// See more: https://blog.union.io/code/2017/08/10/img-svg-fill/
export const HomeIcon = () => (
  <svg
    className="min-w-16 w-16 mr-8 fill-cool-black hover:fill-text-active-orange"
    width="16"
    height="16"
    viewBox="0 0 16 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.7 1C7.9 1.14 8.1 1.14 8.3 1.3L15.5 6.7C15.8 6.9 15.8 7.2 15.6 7.4C15.5 7.6 15.2 7.7 15.0 7.5L8 2.3L1 7.5C0.8 7.7 0.5 7.6 0.4 7.4C0.2 7.2 0.2 6.9 0.5 6.7L7.7 1.3ZM2.6 7.3C2.8 7.3 3.1 7.5 3.1 7.8V13.6C3.1 13.7 3.1 13.8 3.1 13.8C3.1 13.8 3.2 13.8 3.3 13.8H5.7V10.2C5.7 8.9 6.7 7.9 8 7.9C9.3 7.9 10.3 8.9 10.3 10.2V13.8H12.7C12.8 13.8 12.9 13.8 12.9 13.8C12.9 13.8 12.9 13.7 12.9 13.6V7.8C12.9 7.5 13.2 7.3 13.4 7.3C13.7 7.3 13.9 7.5 13.9 7.8L13.9 13.6C13.9 13.8 13.9 14 13.9 14.1C13.9 14.2 13.9 14.4 13.7 14.6C13.5 14.8 13.3 14.8 13.2 14.8C13 14.8 12.9 14.8 12.7 14.8L9.8 14.8C9.5 14.8 9.3 14.6 9.3 14.3C9.3 14.3 9.3 14.3 9.3 14.3C9.3 14.2 9.3 14.2 9.3 14.2V10.2C9.3 9.5 8.7 8.9 8 8.9C7.3 8.9 6.7 9.5 6.7 10.2V14.2C6.7 14.2 6.7 14.2 6.7 14.3C6.7 14.3 6.7 14.3 6.7 14.3C6.7 14.6 6.5 14.8 6.2 14.8L3.3 14.8C3.1 14.8 3 14.8 2.8 14.8C2.7 14.8 2.5 14.8 2.3 14.6C2.1 14.4 2.1 14.2 2.1 14C2.1 14 2.1 13.8 2.1 13.6L2.1 7.8C2.1 7.5 2.3 7.3 2.6 7.3Z"
      shapeRendering={'geometricPrecision'}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);
