import ShortUniqueId from "short-unique-id";

const generateSlug = (title: string) => {
  const { randomUUID } = new ShortUniqueId();
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return `${slug}-${randomUUID(12)}`;
};

export default generateSlug;
