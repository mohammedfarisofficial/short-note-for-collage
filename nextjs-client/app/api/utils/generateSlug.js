import slugify from "slugify";

const generateUniqueSlug = async (Model, title) => {
  try {
    let slug = slugify(title, { lower: true, strict: true });
    let slugExists = await Model.findOne({ slug });

    let count = 1;
    while (slugExists) {
      slug = `${slugify(title, { lower: true, strict: true })}-${count}`;
      slugExists = await Model.findOne({ slug });
      count++;
    }

    return slug;
  } catch (error) {
    console.log(error);
  }
};

export { generateUniqueSlug };
