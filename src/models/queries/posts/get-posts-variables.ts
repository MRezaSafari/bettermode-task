interface IGetPostsVariables {
  limit: number;
  postTypeIds: string[];
  orderByString: string;
  reverse: boolean;
  filterBy: string[];
}

export type { IGetPostsVariables };
