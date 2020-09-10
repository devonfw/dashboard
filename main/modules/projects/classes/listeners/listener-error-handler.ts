const MIN_CONSECUTIVE_SUCCESS = 1;

export class ListenerErrorHandler {
  successCount: number;

  constructor() {
    this.successCount = 0;
  }

  public setError(): void {
    this.successCount = 0;
  }

  public setSuccess(): void {
    this.successCount++;
  }

  public getStatus(): string {
    if (this.successCount >= MIN_CONSECUTIVE_SUCCESS) {
      return '';
    }

    return 'error';
  }
}
