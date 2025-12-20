import myRequest from '@/services/request';
const urlHead = '/article';

// 获取文章列表(旧的请求方式需要通过loadingKey来控制loading)
export const getList = (params: any) => {
  // 原来的多项传参方式
  // const { offset, limit, tagId, userId, idList, pageOrder, keywords } = params;
  // return myRequest.get<IResData>({
  //   url: `${urlHead}?offset=${offset}&limit=${limit}&tagId=${tagId}&userId=${userId}&order=${pageOrder}&idList=${JSON.stringify(idList)}&keywords=${keywords}`,
  // });

  // 现在的多项传参方式
  return myRequest.get<any>(urlHead, params);
};
