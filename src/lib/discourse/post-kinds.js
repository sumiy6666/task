// Where each type of post goes. The type decides the forum category; the
// composer's dropdown only narrows it within that group:
//   article → the Articles category or one of its article topics,
//   poll    → the Polls category,
//   insight → a discussion category (General, Best Practices…).
// Categories are in getCategories()'s shape (parentId, parentName, isPoll).
export const POST_KINDS = ['article', 'poll', 'insight'];

const isArticleCategory = (c) => /article/i.test(c.parentName || (c.parentId ? '' : c.name));
const isFeedbackCategory = (c) => /feedback/i.test(c.name);

export function categoriesFor(kind, categories) {
  if (kind === 'poll') return categories.filter((c) => c.isPoll);
  if (kind === 'article') return categories.filter(isArticleCategory);
  return categories.filter((c) => !c.isPoll && !isArticleCategory(c) && !isFeedbackCategory(c));
}
