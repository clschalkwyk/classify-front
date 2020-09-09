import axiosApi from './endpoint';
import Axios from 'axios';
import {hasToken, getToken} from '../token';

async function uploadFile(event, tmpId, gal, setgal) {
  console.log(event.target.files[0], tmpId);
  console.log(event.target.files, tmpId);



  if(event.target.files.length === 1) {

    var reader = new FileReader();
    var selectedFile = event.target.files[0];
    var base64;
    reader.onload = async function () {
      var comma = this.result.indexOf(',');
      base64 = this.result.substr(comma + 1);

      var formdata = new FormData();
      formdata.append(  "advertImg", base64);
      formdata.append(  "originalname", selectedFile.name);

      // var request = new XMLHttpRequest();
      // request.open("POST", `${process.env.REACT_APP_SERVICE_ENDPOINT}/advert/addImage/${tmpId}`)
      // request.setRequestHeader('Content-Type', 'multipart/form-data');
      // request.setRequestHeader('Authorization', `Bearer ${getToken()}`);
      // request.send(formdata);

      const axiosApi = Axios.create({
        baseURL: process.env.REACT_APP_SERVICE_ENDPOINT,
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`,
        }
      });

      const res = await axiosApi.post(`advert/addImage/${tmpId}`, formdata);
      console.log("RESS", res);
    }

    reader.readAsDataURL(selectedFile);




  }

  setgal([...gal, {url: 'https://picsum.photos/id/237/300/200'}]);


}

export default uploadFile;
