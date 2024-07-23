import { Metadata } from "next";

import Button from "@/components/Button";
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
    <main className="flex flex-col items-center p-10 min-h-screen">
      <p>Homepage</p>

      <Button>My Button</Button>
    </main>
  );
};

export default Home;
