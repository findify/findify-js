import * as React from 'react';

type Theme = object // TODO: implement more okayish type then alias
interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
  (props: P & { children?: React.ReactNode, theme: Theme }, context?: C): React.ReactElement<any> | null;
  propTypes?: React.ValidationMap<P>;
  contextTypes?: React.ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
