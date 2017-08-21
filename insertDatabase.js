/**
 * Created by Tu on 07/04/2017.
 * Chạy insert vào bảng location trước vì quan hệ với
 * bảng images nên không thể chạy cả hai cùng một lúc
 *
 */
const {db, config} = require('./pgp');
let data = require('./filejson/quanhoankiem/lamtochoankiem.json');
// let data = require('./test.json');
const idtype = 6;
const iddiss = 1;

for (let count in data) {
    // console.log(data[count].album)
    let album = data[count].album;
    obj = {};
    arr = [];
    n = arr.length;
    let img = album.map((img, stt) => {
        let obj = {}
        obj['id'] = data[count].id;
        obj['img'] = img
        arr.push(obj)
    })
    arr.map((index, stt) => {
        return obj[stt] = index
    })
    switch (data[count].type) {
        case "Café/Dessert":
            data[count].type = 6;
            break;
        case "Nhà hàng":
            data[count].type = 7;
            break;
        case "Quán ăn":
            data[count].type = 8;
            break;
        case "Làm tóc/Gội đầu/Nối mi":
            data[count].type = 9;
            break;
        case "Thẩm mỹ viện":
            data[count].type = 10;
            break;
        case "Tiệm nail":
            data[count].type = 11;
            break;
        case "Spa/Massage":
            data[count].type = 12;
            break;
        case "Khu chơi Game":
            data[count].type = 13;
            break;
        case "Rạp chiếu phim":
            data[count].type = 14;
            break;
        case "Karaoke":
            data[count].type = 15;
            break;
        case "Thể dục thể thao":
            data[count].type = 16;
            break;
        case "Thể dục thẩm mỹ":
            data[count].type = 17;
            break;
        case "Nha khoa":
            data[count].type = 19;
            break;
        case "Phòng khám":
            data[count].type = 18;
            break;
        case "Trung tâm thương mại":
            data[count].type = 20;
            break;
        case "Siêu thị":
            data[count].type = 21;
            break;
        case "Shop/Cửa hàng":
            data[count].type = 22;
            break;
        case "Chợ":
            data[count].type = 23;
            break;
    }
    // district là id của bảng thành phố phải thay đổi theo id để dữ liệu trùng khớp
    // data[count].type = idtype
    data[count].district = iddiss;
    // thêm dữ liệu vào bảng location
    //
    db.any(
        'insert into public.location(address, lat, long, name, time_open, rate, id_location, id_districts, id_castegory)' +
        'values (${address},${lat},${long},${name},${octime},${rate},${id},${district},${type})',
        data[count]
    ).then(()=>{
        console.log('insert location succeed');
        })
        .catch(error => {
            console.log('error',error);
        });


    // // thêm dữ liệu vào bảng image
    // for(img in obj) {
    //         db.any('insert into public.images(name_img, id_location) values (${img}, ${id})',obj[img])
    //         .then(()=>{
    //             console.log('import images succeed');
    //         })
    //         .catch(error => {
    //             console.log('error',error);
    //         });
    //     }

}