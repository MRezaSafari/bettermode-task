const extractIdFromSlug = (slug: string) => {
  const splitted = slug.split("-");

  return splitted[splitted.length - 1];
};

export default extractIdFromSlug;
