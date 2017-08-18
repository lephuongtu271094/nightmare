/**
 * Created by msi on 07/04/2017.
 */
const {db,config} = require('./pgp')
let data = require('./filejson/quanhoankiem/cafehoankiem.json');


for(let count in data){
    console.log(data[count].album)
    let album = data[count].album
    for(img in album) {
        // console.log('id : '+data[count].id)
        // console.log('img : '+album[img])
        // console.log(data[count])

    }
    //     db.task(t => {
    //         return t.batch([
    //             t.any('insert into images(name_img, id_location) values (${img}, ${id})',data[count]),
    //             t.any(
    //                 'insert into public.location(address, lat, long, name, octime, rate, id_location, id_district, id_type)' +
    //                 ' values (${address},${lat},${long},${name},${octime},${rate},${id},${id_district},${id_type})',
    //                 data[count]
    //             )
    //
    //         ]);
    //     })
    //         .then(() => {
    //             console.log('mport succeed')
    //             // data[0] = result from the first query;
    //             // data[1] = result from the second query;
    //         })
    //         .catch(error => {
    //             console.log(error.message)
    //         });
    // }
    // db.any('insert into public.image(name, id_location) values (${image}, ${id})',data[count])
    //     .then(()=>{
    //
    //     })
    //     .catch(error => {
    //         console.log('error',error);
    //     });

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