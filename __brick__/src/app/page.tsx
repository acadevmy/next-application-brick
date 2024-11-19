import { Metadata } from "next";
import Image from "next/image";

import { getMetadata } from "@/utils/metadata";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

export const generateMetadata = async (): Promise<Metadata | null> => {
  return getMetadata({
    canonicalUrl: DEFAULT_EMPTY_STRING,
    description: DEFAULT_EMPTY_STRING,
    noFollow: false,
    noIndex: false,
    ogImage: {
      title: DEFAULT_EMPTY_STRING,
      url: DEFAULT_EMPTY_STRING,
    },
    title: DEFAULT_EMPTY_STRING,
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
