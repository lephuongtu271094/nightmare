/**
 * Created by Tu on 07/04/2017.
 * Chạy insert vào bảng location trước vì quan hệ với 
 * bảng images nên không thể chạy cả hai cùng một lúc
 *
 */
const {db,config} = require('./pgp')
// let data = require('./filejson/quanhoankiem/cafehoankiem.json');
let data = require('./test.json')



for(let count in data){
    // console.log(data[count].album)
    let album = data[count].album
    obj = {}
    arr = []
    n = arr.length;
    let img = album.map((img ,stt) => {
            let obj = {}
            obj['id'] = data[count].id
            obj['img'] = img
            arr.push(obj)
    })     
    arr.map((index,stt) => {
       return obj[stt] = index
    })
    // type là id categories phải thay đổi theo id để dữ liệu trùng khớp
    data[count].type = 1
    // district là id của bảng thành phố phải thay đổi theo id để dữ liệu trùng khớp
    data[count].district = 36
    // thêm dữ liệu vào mảng location
    
    // db.any(
    //     'insert into public.location(address, lat, long, name, time_open, rate, id_location, id_districts, id_castegory)' +
    //     'values (${address},${lat},${long},${name},${octime},${rate},${id},${district},${type})',
    //     data[count]
    // ).then(()=>{
    //     console.log('insert location succeed');
    //     })
    //     .catch(error => {
    //         console.log('error',error);
    //     });


    // // thêm dữ liệu vào mảng image
    for(img in obj) {
            db.any('insert into public.images(name_img, id_location) values (${img}, ${id})',obj[img])
            .then(()=>{
                console.log('import images succeed');
            })
            .catch(error => {
                console.log('error',error);
            });
        }
    
}



// for(let count in data){
//     db.any('insert into public.location(address, lat, long, name, octime, rate, id_location, id_district, id_type) values (${address},${lat},${long},${name},${octime},${rate},${id},${id_district},${id_type})',data[count])
//         .then(()=>{
//             console.log('import succeed');
//         })
//         .catch(error => {
//             console.log('error',error);
//         });
// }