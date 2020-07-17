export default interface MainMessage<Body> {
  error: boolean;
  body: Body;
}
