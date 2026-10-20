export const getSection = (path: string): string => {
  const [first] = path.split("/").filter(Boolean);
  return first ? `/${first}` : "/";
};
