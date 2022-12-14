import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IOperatorMatriz, OperatorMatriz } from '../operator-matriz.model';
import { OperatorMatrizService } from '../service/operator-matriz.service';

import { OperatorMatrizRoutingResolveService } from './operator-matriz-routing-resolve.service';

describe('OperatorMatriz routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: OperatorMatrizRoutingResolveService;
  let service: OperatorMatrizService;
  let resultOperatorMatriz: IOperatorMatriz | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(OperatorMatrizRoutingResolveService);
    service = TestBed.inject(OperatorMatrizService);
    resultOperatorMatriz = undefined;
  });

  describe('resolve', () => {
    it('should return IOperatorMatriz returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultOperatorMatriz = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOperatorMatriz).toEqual({ id: 123 });
    });

    it('should return new IOperatorMatriz if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultOperatorMatriz = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultOperatorMatriz).toEqual(new OperatorMatriz());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as OperatorMatriz })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultOperatorMatriz = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOperatorMatriz).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
