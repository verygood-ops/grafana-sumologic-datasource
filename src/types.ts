import { DataQuery, DataSourceJsonData } from '@grafana/ui';

export interface SumologicOptions extends DataSourceJsonData {
  timeout: number;
}

export interface SumologicQuery extends DataQuery {
  refId: string;
  format?: 'records' | 'messages' | 'time_series_records';
  query?: string;
  aliasFormat?: string;
  hide?: boolean;
}