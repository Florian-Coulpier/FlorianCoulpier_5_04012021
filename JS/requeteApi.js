///////////////////////////////////////////////////// REQUETE GET VERS L'API ///////////////////////////////////////////////////////////////

getTeddies = () => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status >= 200 &&
          this.status < 400
        ) {
          resolve(JSON.parse(this.responseText));
          console.log(this.responseText);
        } else {
        }
      };
      request.open("GET", "http://localhost:3000/api/teddies/" + idTeddies);
      request.send();
    });
  };