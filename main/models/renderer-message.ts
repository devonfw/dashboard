export class RendererMessage<Body> {
  error: boolean;
  body: Body;

  constructor(error: boolean, body: Body) {
    this.error = error;
    this.body = body;
  }
}
