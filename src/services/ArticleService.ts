import http from '../utils/http';

enum apis {
    GetArticleMd = "",
    GetArticleMd2 = "financialService/v1/api/creditCertdata/creditCert/delete",
}

export default class ArticleService {
    static getArticleMd = (params: any): Promise<any> => {
        return http.get(apis.GetArticleMd + params['id']);
    }
}
