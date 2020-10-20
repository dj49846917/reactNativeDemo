import Home, { HomeState } from '@/models/home'
import Recommend, { RecommendState } from '@/models/Recommend'
import { DvaLoadingState } from 'dva-loading-ts'
import AssetAuction, { AssetAuctionState } from '@/models/AssetAuction';

const models = [Home, Recommend, AssetAuction];
export type RootState = {
  home: HomeState
  recommend: RecommendState
  loading: DvaLoadingState
  assetAuction: AssetAuctionState
}
export default models;