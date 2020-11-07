import { PopularTagType } from '../../../types/popularTag.type';

export class PopularTagsStateInterface {
    loading: boolean;
    error: string | null;
    data: PopularTagType[] | null;
}
