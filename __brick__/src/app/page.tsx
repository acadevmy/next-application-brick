import { Metadata } from "next";
import Image from "next/image";

import { generateCanonicalUrl, getMetadata } from "@/utils/metadata";

export const generateMetadata = async (): Promise<Metadata | null> => {
  const defaultCanonicalUrl = generateCanonicalUrl();

  return getMetadata({
    seoObj: {},
    defaultSeoObj: {
      canonicalUrl: defaultCanonicalUrl,
    },
  });
};

const Home = () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo_white.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="font-mono mt-4">nextjs-brick</p>
    </main>
  );
};

export default Home;
