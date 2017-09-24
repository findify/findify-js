import { Record } from 'immutable';
import { unescape } from 'lodash';

const defaultPosition = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

class Position extends Record(defaultPosition) {
  constructor(ClientRect = defaultPosition) {
    super(ClientRect);
  }

  setValues(ClientRect) {
    return this.set(
      'top',
      ClientRect.top + (window.scrollY || document.documentElement.scrollTop),
    )
      .set(
        'left',
        ClientRect.left +
          (window.scrollX || document.documentElement.scrollLeft),
      )
      .set('height', ClientRect.height)
      .set('width', ClientRect.width);
  }
}

export default class NodeState extends Record({
  _node: void 0,
  _html: '',
  _fallback: void 0,
  position: Position,
  hasFocus: false,
  value: '',
}) {
  constructor({ node, initialHTML }) {
    super({
      _node: node,
      _html: initialHTML,
      position: new Position(node && node.getBoundingClientRect()),
      value: node && node.value,
    });
    return this;
  }

  get instance() {
    return this.get('_node');
  }

  get html() {
    return this.get('_html');
  }

  get hasFocus() {
    return this.get('hasFocus');
  }

  get value() {
    return this.get('value');
  }

  get fallback() {
    if (this.get('_fallback')) return this.get('_fallback');

    const html = document.getElementById('findify_fallback');
    if (!html) return null;

    const fallback = unescape(html.innerHTML);
    this.set('_fallback', fallback);

    return fallback;
  }

  computePosition() {
    if (!this.instance) return this;

    const rect = this.instance.getBoundingClientRect();
    const position = this.get('position');
    const newPosition = position.setValues(rect);

    if (position.equals(newPosition)) return false;

    return this.set('position', newPosition);
  }
}
