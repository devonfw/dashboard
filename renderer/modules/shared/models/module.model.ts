import Route from './route.model';

export default interface Module {
  route: Route;
  help: () => JSX.Element;
}
