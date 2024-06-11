var jwt = parseJwt(getCookie('token'));

    if(jwt.jabatan_tugas == 'KEPALA'){
        document.getElementById("questioner").style.display = "none";
        document.getElementById("choicekepala").style.display = "";
    }else{
        document.getElementById("questioner").style.display = "none";
        document.getElementById("choicepelaksana").style.display = "";
    }

  function beginsubmit() {
    Swal.showLoading();
    var jwt = parseJwt(getCookie('token'));
    const storage = JSON.parse(localStorage.getItem("question"));
    const listsoal = storage.data[0].list_soal;

    var jawabans = [];
    for (var i = 0, len = listsoal.length; i < len; ++i) {
        console.log(listsoal[i].soal_kuesioner);

        element = document.querySelector('input[name="quest'+listsoal[i].soal_kuesioner+'"]:checked');
        if (element != null) {
            var jkues = element.value;
        }else{
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Silahkan isi semua pertanyaan!"
            });
            return false;
        }        

        jawabans[i] = {"soal_kuesioner":listsoal[i].soal_kuesioner, "jawaban_kuesioner":jkues};
    }

    // var obj = new Object();
    // obj.petugas = jwt.no_pendaftaran;
    // obj.kuesioner  = storage.data[0].kuesioner;
    // obj.list_jawaban = jawabans;
    // var jsonString= JSON.stringify(obj);

    console.log(jsonString);

    axios.post('https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/submit_kuesioner', {
        petugas: jwt.no_pendaftaran,
        kuesioner: storage.data[0].kuesioner,
        jawaban: jawabans
    },{
      headers: {
        'x-key': '!@4n)$*^nGnal123@#5npPKU',
        'x-access-key': getCookie('token'),
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
        Swal.fire({
            title: "Good job!",
            text: "Anda telah mengisi survey!",
            icon: "success"
        }).then((result) => {
            location.reload();
        });
    })
    .catch(function (error) {
        alert("Terdapat gangguan saat mengirim data. Silahkan coba kembali.");
    });
  }

  function checkstorage() {
    let f = localStorage.getItem("question");
    console.log(f);
  }


  function getquestion(jenis) {
    // Swal.fire("Sedang memuat data!");
    Swal.showLoading();
    const element = document.getElementById("questioner");

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/getlist_kuesioner/'+jenis,
      headers: {
        'x-key': '!@4n)$*^nGnal123@#5npPKU',
        'x-access-key': getCookie('token'),
      }
    };

    axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data.data));
      const objJSON = response.data.data[0].list_soal;
    //   document.cookie = "question="+objJSON;
    
      localStorage.setItem("question", JSON.stringify(response.data));
      // const obj = JSON.parse(response.data.data);
      // console.log(obj);
      element.innerHTML = '';
      element.innerHTML = '<h4>Isi semua pertanyaan</h4>';
      for (var i = 0, len = objJSON.length; i < len; ++i) {
         var quest = objJSON[i];
         console.log(quest);
         // $("<div id=\"" + student.id + "\">" + student.full_name + " (" + student.user_id + " - " + student.stin + ")</div>")...
         element.innerHTML +=
         `<div class="card">
           <div class="card-body">
             <div class="form-group mb-2">
               <label for="">`+quest.soal_kuesioner+`. `+quest.teks+`
             </div>
             <div class="form-check">
               <input class="form-check-input" type="radio" name="quest`+quest.soal_kuesioner+`" id="flexRadioDefault1" value="`+quest.list_jawaban[0].jawaban_kuesioner+`">
               <label class="form-check-label" for="flexRadioDefault1">
                 `+quest.list_jawaban[0].teks+`
               </label>
             </div>
             <div class="form-check">
               <input class="form-check-input" type="radio" name="quest`+quest.soal_kuesioner+`" id="flexRadioDefault2" value="`+quest.list_jawaban[1].jawaban_kuesioner+`">
               <label class="form-check-label" for="flexRadioDefault2">
                 `+quest.list_jawaban[1].teks+`
               </label>
             </div>
             <div class="form-check">
               <input class="form-check-input" type="radio" name="quest`+quest.soal_kuesioner+`" id="flexRadioDefault2" value="`+quest.list_jawaban[2].jawaban_kuesioner+`">
               <label class="form-check-label" for="flexRadioDefault2">
                 `+quest.list_jawaban[2].teks+`
               </label>
             </div>
             <div class="form-check">
               <input class="form-check-input" type="radio" name="quest`+quest.soal_kuesioner+`" id="flexRadioDefault2" value="`+quest.list_jawaban[3].jawaban_kuesioner+`">
               <label class="form-check-label" for="flexRadioDefault2">
                 `+quest.list_jawaban[3].teks+`
               </label>
             </div>
           </div>
         </div>`;
       }

       element.innerHTML += '<div class="d-grid gap-2 col-6 mx-auto"><button class="btn btn-success" type="button" onclick="beginsubmit()">Submit</button></div>';
       
       if(jenis == 'ppih') {
        document.getElementById("questioner").style.display = "";
        document.getElementById("choicekepala").style.display = "none"; 
       }else if(jenis == 'pimpinan' || jenis == 'tim') {
        document.getElementById("questioner").style.display = "";
        document.getElementById("choicepelaksana").style.display = "none"; 
       }

       Swal.hideLoading();
       
    })
    .catch((error) => {
      Swal.fire({
        title: "Terdapat gangguan koneksi. Silahkan coba lagi.",
        confirmButtonText: "Muat Ulang",
        denyButtonText: "Kembali"
        }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        } 
        });
    });

  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
   }

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
   }