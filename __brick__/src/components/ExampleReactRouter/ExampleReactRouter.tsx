"use client";

import useExampleQuery from "@/reactQuery/example/hooks/useExampleQuery";

const ExampleReactRouter = () => {
  const { example } = useExampleQuery({
    param: "react-router",
  });

  return <p className="mt-4 mb-10">response: {example?.message}</p>;
};

export default ExampleReactRouter;
