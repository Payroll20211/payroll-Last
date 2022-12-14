import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeComponent } from '../list/employee.component';
import { EmployeeDetailComponent } from '../detail/employee-detail.component';
import { EmployeeUpdateComponent } from '../update/employee-update.component';
import { EmployeeRoutingResolveService } from './employee-routing-resolve.service';
import { Authority } from '../../../config/authority.constants';

const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      defaultSort: 'id,asc',
      authorities: [Authority.ADMIN, Authority.MANAGER, Authority.ASSISTANT],
    },

    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeeDetailComponent,
    resolve: {
      employee: EmployeeRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.MANAGER, Authority.ASSISTANT],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeUpdateComponent,
    resolve: {
      employee: EmployeeRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.MANAGER, Authority.ASSISTANT],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeeUpdateComponent,
    resolve: {
      employee: EmployeeRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.MANAGER, Authority.ASSISTANT],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoute)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
