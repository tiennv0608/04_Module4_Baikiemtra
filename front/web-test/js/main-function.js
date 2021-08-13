function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities",
        success: function (data) {
            let content = `<table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Thành phố</th>
      <th scope="col">Quốc gia</th>
      <th scope="col"></th>
    </tr>
  </thead><tbody>`;
            for (let i = 0; i < data.length; i++) {
                content += getCity(data[i]);
            }
            content += `</tbody>
</table>`;
            document.getElementById('content').innerHTML = content;
            document.getElementById('top').innerHTML =`<div class="col-9"><h3>Danh sách thành phố</h3></div>
            <div class="col-3"><button class="btn btn-primary" onclick="showFormCreate()">Thêm thành phố</button></div>`
        }
    })
}

function getNationList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/nations",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getNation(data[i])
            }
            document.getElementById('nation').innerHTML = content
        }
    })
}

function getNation(nation) {
    return `<option value="${nation.id}">${nation.name}</option>`
}

function getCity(city) {
    return `
    <tr>
      <th scope="row">${city.id}</th>
      <td><a onclick="viewDetail(${city.id})">${city.name}</a></td>
      <td>${city.nation.name}</td>
      <td><button class="btn btn-primary" onclick="showFormEdit(${city.id})">Chỉnh sửa</button>|<button class="btn btn-danger" onclick="showFormDelete(${city.id})">Xóa</button></td>
    </tr>`;
}

function viewDetail(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success: function (data) {
            document.getElementById('content').innerHTML = `<div class="row">
        <div class="col-6">Thành phố ${data.name}</div>
        <div class="col-6"><button class="btn btn-primary" onclick="showAll()">Xem danh sách thành phố</button></div>
    </div>
    <div class="row mt-3">
        <p>Tên: ${data.name}</p>
        <p>Quốc gia: ${data.nation.name}</p>
        <p>Diện tích: ${data.area}</p>
        <p>Dân số: ${data.population}</p>
        <p>GDP: ${data.gdp}</p>
        <p>Giới thiệu:</p>
        <br>
        <p>${data.description}</p>
    </div>
<div class="row">
<div class="col-6"></div>
<div class="col-3"><button class="btn btn-primary" onclick="showFormEdit(${data.id})">Chỉnh sửa</button></div>
<div class="col-3"><button class="btn btn-danger" onclick="showFormDelete(${data.id})">Xóa</button></div>
</div>`
        }
    })
}

function showFormCreate() {
    document.getElementById('content').innerHTML = `<div class="row g-3 align-items-center">
  <div class="col-auto">
    <label class="col-form-label"><h3>Thêm thành phố</h3></label>
  </div>
  
  <div class="col-form-label">
  <div class="col-auto">
    <span id="alert" class="col-form-label">    </span>
  </div>
</div>
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="name" class="col-form-label">Tên:</label>
  </div>
  <div class="col-auto">
    <input type="text" id="name" class="form-control" aria-describedby="passwordHelpInline">
  </div>

  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="nation" class="col-form-label">Quốc gia</label>
  </div>
  <div class="col-auto">
    <select id="nation">` +
        getNationList() +
        `</select>
  </div>
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="area" class="col-form-label">Diện tích</label>
  </div>
  <div class="col-auto">
    <input type="text" id="area" class="form-control" aria-describedby="passwordHelpInline">
  </div>

  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="population" class="col-form-label">Dân số</label>
  </div>
  <div class="col-auto">
    <input type="text" id="population" class="form-control" aria-describedby="passwordHelpInline">
  </div>
  
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="gdp" class="col-form-label">GDP</label>
  </div>
  <div class="col-auto">
    <input type="text" id="gdp" class="form-control" aria-describedby="passwordHelpInline">
  </div>
  
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="description" class="col-form-label">Giới thiệu</label>
  </div>
  <div class="col-auto">
    <input type="textarea" id="description" class="form-control" aria-describedby="passwordHelpInline">
  </div>
 
</div>
<button class="btn btn-warning" onclick="create()">Nhập thành phố</button> <button class="btn btn-primary" onclick="showAll()">Thoát</button>`
}

function create() {
    let name = document.getElementById('name').value;
    let area = document.getElementById('area').value;
    let population = document.getElementById('population').value;
    let gdp = document.getElementById('gdp').value;
    let description = document.getElementById('description').value;
    let nation = document.getElementById('nation').value;
    if (area <= 0 || population <= 0 || gdp <= 0) {
        document.getElementById('alert').innerHTML = "Diện tích, dân số và gdp phải là số dương"
    } else {
        let city = {
            name: name,
            area: area,
            population: population,
            gdp: gdp,
            description: description,
            nation: {
                id: nation
            }
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(city),
            url: "http://localhost:8080/cities",
            success: function () {
                loadData();
                document.getElementById('notification').innerHTML = `<div class="col-12">
<span>Tạo mới thành công</span>
</div>`
            }
        })
    }
}

function showFormEdit(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success: function (data) {
            document.getElementById('content').innerHTML = `<div class="row g-3 align-items-center">
  <div class="col-auto">
    <label class="col-form-label"><h3>Chỉnh sửa thành phố ${data.name}</h3></label>
  </div>
  
  <div class="col-form-label">
  <div class="col-auto">
    <span id="alert" class="col-form-label">    </span>
  </div>
</div>
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="name" class="col-form-label">Tên:</label>
  </div>
  <div class="col-auto">
    <input type="text" id="name" class="form-control" aria-describedby="passwordHelpInline" value="${data.name}">
  </div>

  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="nation" class="col-form-label">Quốc gia</label>
  </div>
  <div class="col-auto">
    <select id="nation" >` +
                getNationList() +
                `</select>
  </div>
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="area" class="col-form-label">Diện tích</label>
  </div>
  <div class="col-auto">
    <input type="text" id="area" class="form-control" aria-describedby="passwordHelpInline" value="${data.area}">
  </div>

  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="population" class="col-form-label">Dân số</label>
  </div>
  <div class="col-auto">
    <input type="text" id="population" class="form-control" aria-describedby="passwordHelpInline" value="${data.population}">
  </div>
  
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="gdp" class="col-form-label">GDP</label>
  </div>
  <div class="col-auto">
    <input type="text" id="gdp" class="form-control" aria-describedby="passwordHelpInline" value="${data.gdp}">
  </div>
  
  <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="description" class="col-form-label">Giới thiệu</label>
  </div>
  <div class="col-auto">
    <input type="textarea" id="description" class="form-control" aria-describedby="passwordHelpInline" value="${data.description}">
  </div>
 
</div>
<button class="btn btn-warning" onclick="update(${id})">Cập nhật</button> <button class="btn btn-primary"onclick="showAll()">Thoát</button>\``
        },
    })
}

function update(id) {
    let name = document.getElementById('name').value;
    let area = document.getElementById('area').value;
    let population = document.getElementById('population').value;
    let gdp = document.getElementById('gdp').value;
    let description = document.getElementById('description').value;
    let nation = document.getElementById('nation').value;
    if (area <= 0 || population <= 0 || gdp <= 0) {
        document.getElementById('alert').innerHTML = "Diện tích, dân số và gdp phải là số dương"
    } else {
        let city = {
            name: name,
            area: area,
            population: population,
            gdp: gdp,
            description: description,
            nation: {
                id: nation
            }
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            type: "PUT",
            data: JSON.stringify(city),
            url: "http://localhost:8080/cities/" + id,
            success: function () {
                loadData();
                document.getElementById('notification').innerHTML = `<div class="col-12">
<span>Cập nhật thành công</span>
</div>`
            }
        })
    }
}

function showFormDelete(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success: function (data) {
            document.getElementById('content').innerHTML = `<div class="mb-3">
    <label for="exampleInputEmail1" class="form-label"><h3>Xóa thành phố</h3></label>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Bạn có chắc chắn muốn xóa thành phố ${data.name}</label>
  </div>
  <div class="mb-3 form-check">
   <button onclick="deleteCity(${id})" class="btn btn-danger">Xóa</button>
   <button onclick="showAll()" class="btn btn-primary">Thoát</button>
  </div>`
        }
    })
}

function deleteCity(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/cities/" + id,
        success: function () {
            loadData();
            document.getElementById('notification').innerHTML = `<div class="col-12">
<span>Xóa thành công</span>
</div>`
        }
    })
}

