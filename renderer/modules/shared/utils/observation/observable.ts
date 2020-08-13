import { Data, Error, End } from './observer';

interface Observable {
  subscribe(data?: Data, error?: Error, end?: End): void;
  unsubscribe(): void;
}

type DataSource = (data: Data, error: Error, end: End) => void;

const NoopFunction = () => null;

export class ChannelObservable implements Observable {
  private data: Data;
  private error: Error;
  private end: End;

  constructor(private dataSource: DataSource) {}

  subscribe(data?: Data, error?: Error, end?: End): void {
    this.end = end ? end : NoopFunction;
    this.data = data ? data : NoopFunction;
    this.error = error ? error : NoopFunction;

    this.dataSource(this.data, this.error, this.end);
  }

  unsubscribe(): void {
    this.data = NoopFunction;
    this.error = NoopFunction;
    this.end = NoopFunction;
  }
}
