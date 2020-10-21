import Recommend, { RecommendState } from '@/models/Recommend'
import { DvaLoadingState } from 'dva-loading-ts'
import AssetAuction, { AssetAuctionState } from '@/models/AssetAuction';
import Template, { TemplateState } from './template';
import Home, { HomeState } from './Home';

const models = [Template, Recommend, AssetAuction, Home];
export type RootState = {
  template: TemplateState
  recommend: RecommendState
  loading: DvaLoadingState
  assetAuction: AssetAuctionState
  home: HomeState
}
export default models;