export interface IMenuList {
  id: number;
  path: string;
  name: string;
  authority: string[];
  redirectUrl?: string;
  menuIcon: string;
  routes: IMenuList[];
  isExternalLink?: number;
}
