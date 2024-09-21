export interface IGetPostsResponse {
  data: IPostsData;
  extensions: IExtensions;
}

export interface IPostsData {
  posts: IPosts;
}

export interface IPosts {
  totalCount: number;
  pageInfo: IPageInfo;
  nodes: IPostNode[];
}

export interface IPageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface IPostNode {
  id: string;
  slug: string;
  mappingFields: IMappingField[];
  fields: IField[];
  subscribersCount: number;
  postTypeId: string;
  reactionsCount: number;
  hasMoreContent: boolean;
  isAnonymous: boolean;
  isHidden: boolean;
  shortContent: string;
  createdAt: string;
  publishedAt: string;
  ownerId: string;
  createdById: string;
  status: string;
  spaceId: string;
  imageIds: unknown[];
  pinnedInto: unknown[];
  repliesCount: number;
  totalRepliesCount: number;
  locked: boolean;
  repliedToIds: unknown[];
  repliedToId: unknown;
  title: string;
  description: string;
  textContent: string;
  thumbnail: unknown;
  embedIds: unknown[];
  mentionedMembers: unknown[];
  primaryReactionType: string;
  lastActivityAt: string;
  language: string;
  customSeoDetail: ICustomSeoDetail;
  relativeUrl: string;
  url: string;
  authMemberProps: IAuthMemberProps;
  owner: IOwner;
  tags: ITag[];
  space: ISpace;
  reactions: IReactions[];
}

export interface IReactions {
  count: number;
  reacted: boolean;
  reaction: string;
}

export interface IMappingField {
  key: string;
  type: string;
  value: string;
}

export interface IField {
  key: string;
  value: string;
  relationEntities?: IRelationEntities;
}

export interface IRelationEntities {
  medias: IMedia[];
  members: unknown[];
  posts: unknown[];
  spaces: unknown[];
  tags: unknown[];
}

export interface IMedia {
  cropHeight: unknown;
  cropWidth: unknown;
  cropX: number;
  cropY: number;
  cropZoom: number;
  dominantColorHex: string;
  downloadUrl: string;
  dpi?: number;
  height: number;
  id: string;
  name: string;
  url: string;
  urls: IUrls;
  width: number;
}

export interface IUrls {
  full: string;
  large: string;
  medium: string;
  small: string;
  thumb: string;
}

export interface ICustomSeoDetail {
  description: unknown;
  noIndex: unknown;
  thumbnail: unknown;
  thumbnailId: unknown;
  title: unknown;
  canonicalUrl: unknown;
}

export interface IAuthMemberProps {
  context: string;
  scopes: string[];
  subscribed: boolean;
  permissions: IPermission[];
  availableReplyTypes: IAvailableReplyType[];
  canReact: boolean;
}

export interface IPermission {
  name: string;
  isAuthorized: IIsAuthorized;
  inputPermissions: IInputPermission[];
  outputPermissions: IOutputPermission[];
}

export interface IIsAuthorized {
  authorized: boolean;
  reason: unknown;
  requiredPlan: unknown;
}

export interface IInputPermission {
  path: string;
  isAuthorized: IIsAuthorized2;
}

export interface IIsAuthorized2 {
  authorized: boolean;
  reason: unknown;
  requiredPlan: unknown;
}

export interface IOutputPermission {
  path: string;
  isAuthorized: IIsAuthorized3;
}

export interface IIsAuthorized3 {
  authorized: boolean;
  reason: unknown;
  requiredPlan: unknown;
}

export interface IAvailableReplyType {
  archived: boolean;
  allowedEmojis: unknown;
  context: string;
  createdAt: string;
  forbiddenEmojis: unknown;
  id: string;
  languageTemplate: string;
  name: string;
  description: unknown;
  nativeFieldsTemplates: INativeFieldsTemplates;
  negativeReactions: unknown;
  pluralName: string;
  positiveReactions: unknown;
  primaryReactionType: string;
  shortContentTemplate: string;
  singleChoiceReactions: unknown;
  allowedReactions: unknown;
  customReactions: unknown[];
  slug: string;
  titleTemplate: unknown;
  updatedAt: string;
  mappings: IMapping[];
}

export interface INativeFieldsTemplates {
  description: string;
  thumbnailId: string;
  title: string;
}

export interface IMapping {
  key: string;
  field: string;
  type: string;
  title: string;
  description: string;
  required?: boolean;
  isMainContent?: boolean;
  isSearchable?: boolean;
  default: unknown;
}

export interface IOwner {
  member: IMember;
}

export interface IMember {
  displayName: unknown;
  name: string;
  id: string;
  locale: string;
  profilePictureId: string;
  bannerId: unknown;
  status: string;
  username: string;
  email: string;
  emailStatus: string;
  newEmail: unknown;
  tagline: unknown;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
  relativeUrl: string;
  url: string;
  externalId: unknown;
  roleId: string;
  flagged: boolean;
  teammate: boolean;
  staffReasons: string[];
  profilePicture: IProfilePicture;
  badges: unknown[];
}

export interface IProfilePicture {
  id: string;
  url: string;
  width: unknown;
  height: unknown;
  dominantColorHex: unknown;
  dpi: unknown;
  cropHeight: unknown;
  cropWidth: unknown;
  cropX: number;
  cropY: number;
  cropZoom: number;
  urls: IUrls2;
}

export interface IUrls2 {
  full: string;
  large: string;
  medium: string;
  small: string;
  thumb: string;
}

export interface ITag {
  description: unknown;
  id: string;
  slug: string;
  title: string;
}

export interface ISpace {
  id: string;
  networkId: string;
  name: string;
  description: unknown;
  slug: string;
  type: string;
  layout: string;
  isHomepage: boolean;
  address: IAddress;
  createdById: string;
  groupId: unknown;
  imageId: string;
  bannerId: unknown;
  membersCount: number;
  createdAt: string;
  updatedAt: string;
  private: boolean;
  hidden: boolean;
  inviteOnly: boolean;
  nonAdminsCanInvite: boolean;
  customOrderingIndexInGroup: number;
  whoCanPost: unknown;
  whoCanReact: unknown;
  whoCanReply: unknown;
  customSeoDetail: ICustomSeoDetail2;
  relativeUrl: string;
  url: string;
  image: IImage;
}

export interface IAddress {
  path: string;
  exact: boolean;
  editable: boolean;
}

export interface ICustomSeoDetail2 {
  description: unknown;
  noIndex: unknown;
  thumbnail: unknown;
  thumbnailId: unknown;
  title: unknown;
}

export interface IImage {
  id: string;
  text: string;
  variant: string;
}

export interface IExtensions {
  complexity: number;
}
