import Vue from 'vue';
import ClCRUD from 'cl-crud';

export function SET_CRUD({ crud }) {
	Vue.use(ClCRUD, crud);
}
