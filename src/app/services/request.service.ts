import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }

  postLogin(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let h = {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        Accept: 'text/plain',
      };

      let headers = new HttpHeaders(h);

      this.http
        .post(url, body, { headers: headers })
        .pipe(
          take(1),
          tap(console.log),
        )
        .toPromise()
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  post(url: string, body: any, security: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          return this.http
            .post(url, body, this._options(token))
            .pipe(
              take(1),
              tap(console.log),
            )
            .toPromise();
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  put(url: string, body: any, security: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          return this.http
            .put(url, body, this._options(token))
            .pipe(
              take(1),
              tap(console.log),
            )
            .toPromise();
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  putDownload(url: string, body: any, security: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          let retorno = this.http.put(url, body, this._optionsDownload(token))
            .toPromise()
            .then(response => this.downLoadFile(response, "application/pdf"));
          //.subscribe(
          //  response => this.downLoadFile(response, "application/pdf"))
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url, "myWindow");
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Por favor, habilite pop-up na página.');
    }
  }

  /*downloadFile(url: string, body: any, security: boolean = false) {
    this.validaUser(security)
      .then((token: any) => {
        return this.http
          .put(url, body, this._options(token))
          .subscribe(response => this.downLoadFile2(response, "application/pdf"));
      });
  }

  downLoadFile2(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }*/

  get(url: string, parametros: any, security: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          return this.http
            .get(url, this._options(token, parametros))
            .pipe(
              last(),
              tap(console.log),
            )
            .toPromise();
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  delete(url: string, body: any, security?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          return this.http
            .delete(url, this._optionsDel(token, body))
            .pipe(
              take(1),
              tap(console.log),
            )
            .toPromise();
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  private validaUser(security: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = window.sessionStorage.getItem('token');

      if (security) {
        if (!token) {
          reject(this._userNotFound());
          return;
        }

        resolve(token);
        return;

      }

      resolve('');
      return;

    });
  }

  private _options(token?: string, parametros: any = null): any {
    let h = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    console.log('_options: ', token);
    if (token) {
      h['Authorization'] = token;
    }
    let headers = new HttpHeaders(h);
    let params = new HttpParams();

    if (parametros) {
      for (let num in parametros) {
        params = params.set(num, parametros[num]);
      }
    }
    return {
      headers: headers,
      params: params
    };
  }

  private _optionsDownload(token?: string, parametros: any = null): any {
    let h = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    console.log('_options: ', token);
    if (token) {
      h['Authorization'] = token;
    }
    let headers = new HttpHeaders(h);
    let params = new HttpParams();

    if (parametros) {
      for (let num in parametros) {
        params = params.set(num, parametros[num]);
      }
    }
    return {
      headers: headers,
      params: params,
      responseType: 'blob' as 'json'
    };
  }

  private _optionsDel(token?: string, parametros: any = null): any {
    let h = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    let b = parametros;
    console.log('_options: ', token);
    if (token) {
      h['Authorization'] = token;
    }
    let headers = new HttpHeaders(h);
    let params = new HttpParams();

    if (parametros) {
      for (let num in parametros) {
        params = params.set(num, parametros[num]);
      }
    }
    return {
      headers: headers,
      body: b,
    };
  }

  _userNotFound(): any {
    return {
      code: 401,
      message: 'Not request permission',
    };
  }
}
