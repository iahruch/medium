import { AuthStateInterface } from '../../auth/types/authState.interface';
import { FeedStateInterface } from '../components/feed/types/feedState.interface';
import { PopularTagsStateInterface } from '../components/popularTags/types/popularTagsState.interface';
import { ArticleStateInterface } from '../components/article/types/articleState.interface';
import { CreateArticleStateInterface } from '../../createArticle/types/createArticleState.interface';
import { EditArticleStateInterface } from '../../editArticle/types/editArticleState.interface';
import { SettingStateInterface } from '../../settings/types/settingState.interface';
import { UserProfileStateInterface } from '../../userProfile/types/userProfileState.interface';

export interface AppStateInterface {
    auth: AuthStateInterface;
    feed: FeedStateInterface;
    popularTags: PopularTagsStateInterface;
    article: ArticleStateInterface;
    createArticle: CreateArticleStateInterface;
    editArticle: EditArticleStateInterface;
    settings: SettingStateInterface;
    userProfile: UserProfileStateInterface;
}
