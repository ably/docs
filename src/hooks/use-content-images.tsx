import { useStaticQuery, graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export type Image = {
  childImageSharp: IGatsbyImageData;
  extension: string;
  publicURL: string;
  relativePath: string;
};

export const findImage = (images: Image[]) => {
  return (rawSrc: string) => {
    const src = rawSrc.replace('@content/', '');

    return images.find((image) => image.relativePath === src);
  };
};

export const useContentImages = () => {
  const results = useStaticQuery(graphql`
    fragment ContentImage on File {
      publicURL
      relativePath
      childImageSharp {
        gatsbyImageData
      }
    }
    query {
      images: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        nodes {
          ...ContentImage
        }
      }
    }
  `);
  const images = results?.images?.nodes ?? [];

  if (images.length === 0) {
    console.warn('useContentImages images query did not return any images!');
  }

  return { images: images, findImage: findImage(images) };
};
