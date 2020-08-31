export default interface Route {
  id: number | string;
  section: string;
  path: string;
  icon: JSX.Element;
  submenu?: Route[];
}
