export interface FollowUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface FollowerItem {
  createdAt: string;
  follower: FollowUser;
}

export interface FollowingItem {
  createdAt: string;
  following: FollowUser;
}

export interface GetFollowersResponse {
  message: string;
  success: boolean;
  data: FollowerItem[];
}

export interface GetFollowingsResponse {
  message: string;
  success: boolean;
  data: FollowingItem[];
}
