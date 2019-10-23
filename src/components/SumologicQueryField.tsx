import _ from 'lodash';
import React from 'react';

import { Editor } from '@grafana/slate-react';
import { Block, Document, Text, Value, Editor as CoreEditor } from 'slate';

// dom also includes Element polyfills
import { ExploreQueryFieldProps } from '@grafana/ui';
import SumologicDatasource from '../datasource';
import { SumologicQuery, SumologicOptions } from '../types';

export interface Props extends ExploreQueryFieldProps<SumologicDatasource, SumologicQuery, SumologicOptions> {}

interface State {
  value: Value;
}

export const makeFragment = (text: string) => {
  const lines = text.split('\n').map((line: any) =>
    Block.create({
      type: 'paragraph',
      nodes: [Text.create(line)],
    } as any)
  );

  const fragment = Document.create({
    nodes: lines,
  });
  return fragment;
};

export const getInitialValue = (query: string) => Value.create({ document: makeFragment(query) });

export class SumologicQueryField extends React.PureComponent<Props, State> {
  plugins: any[];

  constructor(props: Props, context: React.Context<any>) {
    super(props, context);

    this.plugins = [];

    this.state = {
      value: getInitialValue(''),
    };
  }

  componentDidMount() {
    //if (!this.props.query.format === 'logs') {
    //  this.onChangeQuery('', true);
    //}
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps: Props) {
    // if query changed from the outside (i.e. cleared via explore toolbar)
    //if (!this.props.query.format === 'logs') {
    //  this.onChangeQuery('', true);
    //}
  }

  onChangeQuery = (value: string, override?: boolean) => {
    // Send text change to parent
    const { query, onChange, onRunQuery } = this.props;
    if (onChange) {
      const nextQuery: SumologicQuery = { ...query, query: value, format: 'logs' };
      onChange(nextQuery);

      if (override && onRunQuery) {
        onRunQuery();
      }
    }
  };

  onKeyDown = (event: Event, editor: CoreEditor, next: Function) => {
    return next();
  };

  render() {
    return (
      <div className="slate-query-field">
        <Editor onChange={this.onChangeQuery} onKeyDown={this.onKeyDown} value={this.state.value} />
      </div>
    );
  }
}
