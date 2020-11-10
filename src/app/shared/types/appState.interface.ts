import { AuthStateInterface } from '../../auth/types/authState.interface';
import { FeedStateInterface } from '../components/feed/types/feedState.interface';
import { PopularTagsStateInterface } from '../components/popularTags/types/popularTagsState.interface';
import { ArticleInterface } from './article.interface';
import { ArticleStateInterface } from '../components/article/types/articleState.interface';

export interface AppStateInterface {
    auth: AuthStateInterface;
    feed: FeedStateInterface;
    popularTags: PopularTagsStateInterface;
    article: ArticleStateInterface;
}
