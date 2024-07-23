import { Metadata } from "next";

import Button from "@/components/Button";
import { getMetadata } from "@/utils/metadata";

export const generateMetadata = async (): Promise<Metadata | null> => {
  return getMetadata({
    canonicalUrl: "",
    description: "",
    noFollow: false,
    noIndex: false,
    ogImage: {
      title: "",
      url: "",
    },
    title: "",
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
