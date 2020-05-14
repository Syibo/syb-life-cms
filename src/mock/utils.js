import qs from 'qs';
import urlLib from 'url';

export const getUrlParams = url => {
	return qs.parse(urlLib.parse(url).query);
};
