import * as React from 'react';

type Theme = {
  [key: string]: string;
};

export interface ThemedSFC<P = Record<string, any>, C = Record<string, any>>
  extends React.FC<P> {
  (
    props: P & { children?: React.ReactNode; theme: Theme },
    context?: C
  ): React.ReactElement<any> | null;
  propTypes?: React.ValidationMap<P>;
  contextTypes?: React.ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

declare namespace Global {
  declare module '*.css' {
    const content: Record<string, string>;
    export default content;
  }
}
