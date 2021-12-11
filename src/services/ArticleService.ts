import http from '../utils/http';

enum apis {
    GetArticles = "articles",
    GetArticle = "article",
    PublishArticle = "publishArticle",
    SaveArticleAsDraft = "saveArticleAsDraft",
    GetCategories = "getCategories",
    GetWebsiteLatestComments = "getWebsiteLatestComments",
    GetRecommendArticles = "getRecommendArticles",
}

export default class ArticleService {
    static getArticleMd = (params: any): Promise<any> => {
        return http.post(apis.GetArticle, params);
    }

    static getArticles = (params: any): Promise<any> => {
        return  http.post(apis.GetArticles, params);
    }

    static getArticleObj =(params: any): Promise<any> => {
        return http.post(apis.GetArticle, params);
    }

    static publishArticle = (params: any): Promise<any> => {
        return http.post(apis.PublishArticle, params);
    }

    static saveArticleAsDraft =(params: any): Promise<any> => {
        return http.post(apis.SaveArticleAsDraft, params);
    }

    static getCategories =(): Promise<any> => {
        return http.post(apis.GetCategories);
    }

    static getRecommendArticles =(): Promise<any> => {
        return http.post(apis.GetRecommendArticles);
    }

    static getWebsiteLatestComments =(): Promise<any> => {
        return http.post(apis.GetWebsiteLatestComments);
    }
}
