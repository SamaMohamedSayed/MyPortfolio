import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }
  baseUrl='http://localhost:4000/'

  homePage():Observable<any>{
    return this.http.get(`${this.baseUrl}home`)
  }
  homeUpdates(body:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}home`,body)
  }


  aboutPage():Observable<any>{
    return this.http.get(`${this.baseUrl}about/about-data`)
  }
  getAboutText():Observable<any>{
    return this.http.get(`${this.baseUrl}about/about`)
  }
  updatetext(text:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}about`, text )
  }

  getEdu():Observable<any>{
    return this.http.get(`${this.baseUrl}about/education`)
  }
  addEdu(body:any):Observable<any>{
    return this.http.post(`${this.baseUrl}about/education`,body)
  }
  updateEdu(id:string,body:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}about/education/${id}`,body)
  }
  deleteEdu(id:string):Observable<any>{
    return this.http.put(`${this.baseUrl}about/education/${id}`,{})
  }
  
  getCertif():Observable<any>{
    return this.http.get(`${this.baseUrl}about/certif`)
  }
  updateCertif(id:string,body:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}about/certif/${id}`,body)
  }
  addCertif(body:any):Observable<any>{
    return this.http.post(`${this.baseUrl}about/certif`,body);
  }
  deleteCertif(id:string):Observable<any>{
    return this.http.put(`${this.baseUrl}about/certif/${id}`,{})
  }
  
  getSkills():Observable<any>{
    return this.http.get(`${this.baseUrl}about/skills`)
  }
  updateSkills(body:any,id:string):Observable<any>{
    return this.http.patch(`${this.baseUrl}about/skills/${id}`,body)
  }
  deleteSkill(id:string):Observable<any>{
    return this.http.put(`${this.baseUrl}about/skills/${id}`,{})
  }
  projectPage():Observable<any>{
    return this.http.get(`${this.baseUrl}project`)
  }
  projectUpdate(id:string,body:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}project/${id}`,body)
  }
  projectDelete(id:string):Observable<any>{
    return this.http.patch(`${this.baseUrl}project/delete/${id}`,{})
  }
  addProject(body:any):Observable<any>{
    return this.http.post(`${this.baseUrl}project`,body)
  }


  servicePage():Observable<any>{
    return this.http.get(`${this.baseUrl}service`)
  }
  addService(body:any):Observable<any>{
    return this.http.post(`${this.baseUrl}service`,body)
  }
  serviceUpdate(id:string,body:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}service/${id}`,body)
  }
  deleteService(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}service/${id}`)
  }


  contactPage(body:any):Observable<any>{
    return this.http.post(`${this.baseUrl}contact`,body)
  }
  getContact():Observable<any>{
    return this.http.get(`${this.baseUrl}contact`)
  }
  hideMsg(id: string) {
  return this.http.patch(`${this.baseUrl}contact/${id}`, {});
  }


}
