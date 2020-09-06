async function uploadFile(event, tmpId, gal, setgal) {
  console.log(event.target.files, tmpId);

  if(event.target.files.length === 1) {
    const formdata = new FormData();

    formdata.append(
        "advertImg",
        event.target.files[0],
        event.target.files[0].name,

    );

  }

  setgal([...gal, {url: 'https://picsum.photos/id/237/300/200'}]);


}

export default uploadFile;
