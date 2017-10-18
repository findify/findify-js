class InstanceMemo {
  items: any[] = [];
  memorize = false;
  instance = void 0;
  direction: number = 0;

  set(items, dir = 0) {
    this.direction = dir;
    this.memorize = true;
    this.items = !!~dir ? [...this.items, ...items] : [...items, ...this.items];
  }

  get() {
    return this.items;
  }

  reset() {
    if (!this.memorize) this.items = [];
    this.memorize = false;
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

    return res;
  }
}

export default InstanceMemo;
