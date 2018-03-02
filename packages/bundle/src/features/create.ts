export const createFeature = (entity) => {
  return require(`./${entity.type}`).default(entity);
}
