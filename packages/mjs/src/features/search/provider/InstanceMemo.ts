const unique = (items, cache) =>
  items.filter(i => !cache.find(c => c.hash === i.hash));

class InstanceMemo {
  items: any[] = [];
  memorized = false;
  instance = void 0;
  direction: number = 0;

  memorize(dir = 0) {
    this.direction = dir;
    this.memorized = true;
  }

  get() {
    return this.items;
  }

  merge(response) {
    const dir = this.direction;
    const items = response.items.map((item, i) => ({
      ...item,
      position: Number(response.meta.offset) + i,
    }));
    const res = response;

    if (dir) {
      this.direction = 0;
      res.items = !!~dir
        ? [...this.items, ...items]
        : [...items, ...this.items];
    } else {
      res.items = [...this.items, ...items];
    }

    this.items = res.items;

    return res;
  }
}

export default InstanceMemo;
