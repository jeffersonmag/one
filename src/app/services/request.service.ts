import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, take, tap } from 'rxjs/operators';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService
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

  putDownload(url: string, body: any, security: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          this.http.put(url, body, this._optionsDownload(token))
            .toPromise()
            .then(response => this.downLoadFile(response, "application/pdf"));
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  postDownload(url: string, body: any, security: boolean = false, modulo?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          return this.http
            .post(url, body, this._optionsDownload(token))
            .toPromise()
            .then(response => this.downLoadFile(response, 'text/csv;charset=ANSI', modulo));
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  getDownload(url: string, type: string, parametros: any, security: boolean = false, bordero?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validaUser(security)
        .then((token: any) => {
          this.http.get(url, this._optionsDownload(token, parametros))
            .subscribe(response => this.downLoadFile(response, type, bordero))
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  downLoadFile(data: any, type: string, filename?) {
    var blob = new Blob([data], {
      type: type
    });

    let url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);

    if (type === 'text/csv;charset=ANSI') {
      if (filename != '') {
        a.download = filename + '.csv';
        a.href = url;
      } else {
        a.download = 'esteira.csv';
        a.href = url;
      }
    }

    if (type === 'application/pdf' && filename !== undefined) {
      a.download = 'bordero_' + filename + '.pdf';
      a.href = url;
    } else if (type === 'application/pdf' && filename === undefined) {
      a.download = 'bordero.pdf';
      a.href = url;
    }

    a.click();
    window.URL.revokeObjectURL(url);

    if (url != null) {
      this.makeToast('success', 'Sucesso', 'O download foi realizado com sucesso!');
    }
  }

  makeToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(body, `${titleContent}`, config);
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
    // console.log('_options: ', token);
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
    };
  }

  private _optionsDownload(token?: string, parametros: any = null): any {
    let h = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    // console.log('_options: ', token);
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
      responseType: 'blob' as 'json',
    };
  }

  private _optionsDel(token?: string, parametros: any = null): any {
    let h = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    let b = parametros;
    // console.log('_options: ', token);
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
