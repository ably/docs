import { FC, ReactNode, createContext, useContext } from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export type Image = {
  childImageSharp: IGatsbyImageData;
  extension: string;
  publicURL: string;
  relativePath: string;
};

export const findImage = (images: Image[]) => {
  return (rawSrc: string) => {
    const src = rawSrc.replace('@', '');

    return images.find((image) => image.relativePath === src);
  };
};

const ContentImagesContext = createContext<Image[]>([]);

export const useContentImages = () => {
  const images = useContext(ContentImagesContext);

  if (images === undefined) {
    throw new Error('useContentImages context must be used within a ContentImagesProvider');
  }

  return { images: images, findImage: findImage(images) };
};

interface ContentImagesProviderProps {
  children: ReactNode;
  images: Image[];
}

export const ContentImagesProvider: FC<ContentImagesProviderProps> = ({ children, images }) => {
  return <ContentImagesContext.Provider value={images}>{children}</ContentImagesContext.Provider>;
};

export const query = graphql`
  fragment ContentImage on File {
    publicURL
    relativePath
    childImageSharp {
      gatsbyImageData
    }
  }
`;
