import Vue from 'vue';

import { PermissionDirective, checkPerm } from './permission/index';
import { Service, Permission } from './decorator/service';
import { BaseService } from './request/service';
import * as utils from './utils/index';

import './common/index';
import './components/index';
import './directive/index';

Vue.use(PermissionDirective);

export { Service, Permission, BaseService, checkPerm, utils };
