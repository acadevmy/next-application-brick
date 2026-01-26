export const fetchExampleData = async (param: string) => {
  return {
    message: `Hello, world!.\n\nTime: ${Date.now()}.\n\nParam: ${param}`,
  };
};
