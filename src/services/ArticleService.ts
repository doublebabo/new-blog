import http from '../utils/http';

enum apis {
    GetArticles = "articles",
    GetArticle = "article",
    PublishArticle = "publishArticle",
    SaveArticleAsDraft = "saveArticleAsDraft",
}

export default class ArticleService {
    static getArticleMd = async (params: any): Promise<any> => {
        return await http.post(apis.GetArticle, params);
    }

    static getArticles = (params: any): Promise<any> => {
        return  http.post(apis.GetArticles, params);
    }

    static getArticleObj =async (params: any): Promise<any> => {
        return await http.post(apis.GetArticle, params);
    }

    static publishArticle = async (params: any): Promise<any> => {
        return await http.post(apis.PublishArticle, params);
    }

    static saveArticleAsDraft =async (params: any): Promise<any> => {
        return await http.post(apis.SaveArticleAsDraft, params);
    }
}
