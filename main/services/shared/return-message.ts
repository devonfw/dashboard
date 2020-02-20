export class ReturnMessage {
  error: boolean;
  body: any;

  constructor(error: boolean, body: any) {
    this.error = error;
    this.body = body;
  }
}
