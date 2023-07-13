export type ToDoType = {
  _id: number;
  title: string;
  completed: boolean;
};

export enum FilterEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
};

export type Token = {
  refresh: string;
  access: string;
}

export default interface IUser {
  id?: any | null,
  username?: string | null,
  email?: string,
  tokens: Token
}

export type AvailableButtonTypes = 'edit' | 'delete';