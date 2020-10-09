import Home, { HomeState } from '@/models/home'
import Recommend, { RecommendState } from '@/models/Recommend'
import { DvaLoadingState } from 'dva-loading-ts'

const models = [Home, Recommend];
export type RootState = {
  home: HomeState,
  recommend: RecommendState
  loading: DvaLoadingState
}
export default models;