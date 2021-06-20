import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Resource } from '../models/Resource';
import { Serializer } from './serializer';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import { QueryOptions } from './query.options';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
export class ResourceService<T extends Resource> {
  constructor(
    private httpClient: HttpClient,
    private url: string,
    private endpoint: string,
    private serializer: Serializer) { }

  public create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item)).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .map(data => this.serializer.fromJson(data) as T);
  }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${this.endpoint}`,
        this.serializer.toJson(item)).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        )
      .map(data => this.serializer.fromJson(data) as T);
  }

  public getBankAccount(item: T, UserId: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${UserId}?UserId=${UserId}`,
        this.serializer.toJson(item)).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        )
      .map(data => this.serializer.fromJson(data) as T);
  }

  public saveBankAccount(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}`,
        this.serializer.toJson(item)).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        )
      .map(data => this.serializer.fromJson(data) as T);
  }

  public read(id: string): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .map((data: any) => this.serializer.fromJson(data.goods[0]) as T);
  }

  getByUserEmail(email: string): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/getbyemail/${email}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .map((data: any) => this.serializer.fromJson(data.goods[0]) as T);
  }

  list(queryOptions: QueryOptions): Observable<T[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .map((data: any) => this.convertData(data.goods));
  }

  // search(queryOptions: QueryOptions): Observable<T[]> {
  //   return this.httpClient
  //     .get(`${environment.searchApiUrl}/search?${queryOptions.toQueryString()}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => this.convertData(data.goods));
  // }

  // profile(user_id: string, requestor_id: string): Observable<T[]> {
  //   return this.httpClient
  //     .get(`${environment.profileApiUrl}/profile?UserId=${user_id}&RequestorId=${requestor_id}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => this.convertData([data.goods]));
  // }

  // initiateTransaction(item: T,task_id: string, task_created_at: string, assigned_user: string, agreed_price: number): Observable<T[]> {
  //   return this.httpClient
  //     .post(`${environment.initiateTransactionApiUrl}/initiate-transaction?TaskId=${task_id}&TaskCreatedAt=${task_created_at}&AssignedUser=${assigned_user}&AgreedPrice=${agreed_price}`, this.serializer.toJson(item)).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => this.convertData([data.goods]));
  // }

  // payUser(payment_id: string): Observable<T[]> {
  //   return this.httpClient
  //     .post(`${environment.payUserApiUrl}/pay-user?PaymentId=${payment_id}`, null).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => this.convertData([data.goods]));
  // }

  // assign(task_id: string, task_created_at: string, assigned_user: string, agreed_price: number, private_chat_id: string): Observable<T[]> {
  //   return this.httpClient
  //     .get(`${environment.assignApiUrl}/assign?TaskId=${task_id}&TaskCreatedAt=${task_created_at}&AssignedUser=${assigned_user}&AgreedPrice=${agreed_price}&PrivateChatId=${private_chat_id}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => this.convertData([data.goods]));
  // }

  // complete(task_id: string, task_created_at: string): Observable<T[]> {
  //   return this.httpClient
  //     .get(`${environment.releasePaymentApiUrl}/release-payment?TaskId=${task_id}&TaskCreatedAt=${task_created_at}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => this.convertData([data.goods]));
  // }

  // requestPayment(task_id: string, task_created_at: string): Observable<T[]> {
  //   return this.httpClient
  //     .get(`${environment.requestPaymentApiUrl}/request-payment?TaskId=${task_id}&TaskCreatedAt=${task_created_at}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => this.convertData([data.goods]));
  // }

  // getTask(id: string, requestorId: string): Observable<T> {
  //   let queryOptions = '';
  //   if(requestorId){
  //     queryOptions = queryOptions + '&Rid='+ requestorId;
  //   }

  //   return this.httpClient
  //     .get(`${environment.taskApiUrl}/getTask?Id=${id}${queryOptions}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     )
  //     .map((data: any) => this.serializer.fromJson(data.goods) as T);
  // }

  // getMyTasks(UserId: string): Observable<T> {
  //   return this.httpClient
  //     .get(`${environment.mytasksApiUrl}/getMyTasks?UserId=${UserId}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     )
  //     .map((data: any) => this.serializer.fromJson(data.goods) as T);
  // }

  // getPayouts(UserId: string): Observable<any> {
  //   return this.httpClient
  //     .get(`${environment.payoutsApiUrl}/getPayouts?UserId=${UserId}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => data.goods);
  // }

  // getUsers(UserId: string): Observable<any> {
  //   return this.httpClient
  //     .get(`${this.url}/${this.endpoint}`).pipe(
  //       retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     ).map((data: any) => data.goods);
  // }

  // listbyuserid(userId): Observable<T[]> {
  //   return this.httpClient
  //     .get(`${this.url}/${this.endpoint}/getbyuserid/${userId}`)
  //     .map((data: any) => this.convertData(data.goods));
  // }

  // listbytaskid(taskId): Observable<T[]> {
  //   return this.httpClient
  //     .get(`${this.url}/${this.endpoint}/getbytaskid/${taskId}`)
  //     .map((data: any) => this.convertData(data.goods));
  // }

  getCountry(): Observable<T[]> {
    return this.httpClient
      .get(`http://ip-api.com/json/24.48.0.1`)
      .map((data: any) => data.goods);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened. please try again later.');
  }

  private convertData(data: any): T[] {
    return data.map((item: any) => this.serializer.fromJson(item));
  }
}

@Injectable()
export class MyFirstInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = null;
    if (localStorage.getItem('access_token')) {
      // token = atob(localStorage.getItem('access_token'));
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('profile_name');
      localStorage.removeItem('profile_picture');
    }

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
  }
}
