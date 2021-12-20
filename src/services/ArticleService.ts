import http from '../utils/http';

enum apis {
    GetArticles = "articles",
    GetArticle = "article",
    PublishArticle = "actions/publishArticle",
    SaveArticleAsDraft = "actions/saveArticleAsDraft",
    GetCategories = "getCategories",
    GetWebsiteLatestComments = "getWebsiteLatestComments",
    GetRecommendArticles = "getRecommendArticles",
    AddNewWebsiteComment = "addNewWebsiteComment",
    Login = "login",
    UpdateDraft = "actions/updateDraft",
    UpdateArticleAndPublish = "actions/updateArticleAndPublish",
    UploadImage = "actions/uploadImage",
    DeleteArticle = "actions/deleteArticle",
    Ip = "https://ip.tool.lu/",
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

    static updateArticleAndPublish =(params: any): Promise<any> => {
        return http.post(apis.UpdateArticleAndPublish, params);
    }

    static updateDraft =(params: any): Promise<any> => {
        return http.post(apis.UpdateDraft, params);
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

    static addNewWebsiteComment =(params: any): Promise<any> => {
        return http.post(apis.AddNewWebsiteComment, params);
    }

    static login =(params: any): Promise<any> => {
        return http.post(apis.Login, params);
    }

    static register =(params: any): Promise<any> => {
        return http.post(apis.Login, params);
    }

    static uploadImage =(params: any): Promise<any> => {
        return http.post(apis.UploadImage, params );
    }
    static deleteArticle =(params: any): Promise<any> => {
        return http.post(apis.DeleteArticle, params );
    }

    static getIpInfo =(fn: Function) => {
        let s = document.createElement('script');
        s.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
        //var returnCitySN = {"cip": "223.167.168.195", "cid": "310000", "cname": "上海市"};
        s.onload = () => {
            localStorage.setItem('ip', (window as any).returnCitySN['cip'])
            localStorage.setItem('location', (window as any).returnCitySN['cname'])
            fn()
        };
        document.body.append(s);
    }

}
