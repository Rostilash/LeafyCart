export const isNew = (createdAt: Date) => {
  const now = new Date();
  const daysSince = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysSince <= 14;
};
