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

      // const axiosApi = Axios.create({
      //   baseURL: process.env.REACT_APP_SERVICE_ENDPOINT,
      //   headers: {
      //     'Authorization': `Bearer ${getToken()}`,
      //   }
      // });

      const res = await axiosApi.post(`advert/addImage/${tmpId}`, formdata);
      console.log("RESS", res);

      setgal([...gal, {url: res.data.result}])
    }

    reader.readAsDataURL(selectedFile);

  }
}

export default uploadFile;
