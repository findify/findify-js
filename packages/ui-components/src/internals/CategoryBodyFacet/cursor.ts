type Cursor = {
  cursor: number[];
  childrenCount: number;
};

export const createCursor = (list, cursor, childrenCount): Cursor => {
  if (!list.children) return { cursor, childrenCount };

  const index = list.children.findIndex(item => item.selected);
  const children = list.children[index];

  if (index < 0) return { cursor, childrenCount: list.children.length };
  return createCursor(children, cursor.push(index), children.length);
};
