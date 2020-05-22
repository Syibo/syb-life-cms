import { BaseService, Service, Permission } from '@/cool';

@Service('web/article')
export default class extends BaseService {
	@Permission('artNum')
	artNum() {
		return this.request({
			url: '/artNum',
			method: 'GET'
		});
	}
}
