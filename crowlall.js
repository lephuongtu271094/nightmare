const shortid = require('shortid');
const Nightmare = require('nightmare');
const async = require('async');
let nightmare = Nightmare({show: false});
const downloader = require('image-downloader');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path')

let realdata = [];
const diachi = 'market  ';
const duongdan = 'https://www.foody.vn/ha-noi/shop/cho?q=';

function getOption(url, name, id, index) {

    if(url === 0){
        url = '';
        des = '';
        destPath = '';
    }else {
        destPath = __dirname + '/img/quanhoankiem/'+ diachi +'/';
        if (index) {
            des = destPath + id + index + '.jpg';
        } else {
            des = destPath + id + '.jpg';
        }
    }


    options = {
        url: url,
        dest: des,
        destPath: destPath,
        done: function (err, filename, image) {
            if (err) {
                console.log(err.message)
            }
            console.log('File saved to', filename)
        }
    }
    return options;
}

function crawl(arr, cb) {

    function test(item, cb) {

        let night = new Nightmare({show: false});
        night.goto(item)
            .wait(1000)
            .click('.fd-btn-login-new')
            .wait(1000)
            .insert('input[ng-model="Data.Email"]', 'systemec2017@gmail.com')
            .type('input[ng-model="Data.Password"]', 'rootvn')
            .click('.btn-login')

            .wait(1000)
            .click('.lazy')
            .wait(1000)
            .click('.btn-load-more')
            .wait(1000)
            .evaluate(function () {
                function getLongLat(data) {

                    let metas = document.getElementsByTagName('meta');
                    let n = metas.length;
                    for (let i = 0; i < n; i++) {
                        if (metas[i].getAttribute("property") == data) {
                            return metas[i].getAttribute("content");
                        }
                    }
                    return "";
                }

                try {
                    let obj = {};
                    images = []

                    let name = document.querySelector('.main-info-title > h1').innerText.trim();
                    let type = document.querySelector('.category .category-items > a').innerText;
                    let address = document.querySelectorAll('.res-common-add span')[1].querySelector('a > span').innerText;
                    let district = document.querySelectorAll('.res-common-add span')[3].querySelector('a > span').innerText;
                    let octime = document.querySelectorAll('.micro-timesopen span')[1].getAttribute('title').replace('|', '');
                    // let octime = openTime + ' - ' + closeTime;

                        let rate = document.querySelectorAll('.microsite-point-avg')[0].innerText;


                    let lat = getLongLat('place:location:latitude');
                    let long = getLongLat('place:location:longitude');

                    let image = document.querySelector('.main-image .img a > img').getAttribute('src');

                    //download image

                    let album = document.querySelectorAll('.fpd-photo-list ul li')
                    album.forEach(img => {
                        images.push(img.querySelector('a img').getAttribute('src'))
                    })


                    obj['name'] = name;
                    obj['type'] = type;
                    obj['address'] = address;
                    obj['district'] = district;
                    obj['octime'] = octime;
                    obj['rate'] = parseFloat(rate);
                    obj['lat'] = parseFloat(lat);
                    obj['long'] = parseFloat(long);
                    obj['image'] = image;
                    obj['album'] = images;
                    return obj;
                } catch (err) {
                    console.log('Searching not found');
                    return {};
                }
            })
            .end()
            .then(function (res) {
                if (!res) {
                    cb(null, {});
                }
                try {
                    arr2 = []
                    let id = shortid.generate();
                    let opt1 = getOption(res['image'], res['name'], id);
                    shell.mkdir('-p', opt1['destPath']);
                    downloader(opt1)
                    res['image'] = path.basename(opt1['dest']);

                    res['album'].forEach((img, index) => {
                        res['id'] = id;
                        let opt = getOption(img, res['name'], id, index);
                        shell.mkdir('-p', opt['destPath']);
                        downloader(opt)
                        arr2.push(path.basename(opt['dest']))
                    })


                    res['album'] = arr2
                    // console.log(res['image'])

                    realdata.push(res);

                    exportJson(realdata);
                    cb(null, res);
                } catch (err) {
                    console.log(err.message);
                    cb(null, {});
                }
            });
    }

    // so luong web truy cap 1 luc
    async.mapLimit(arr, 5, test, function (err, res) {
        cb(null, res);
    });
}

nightmare
    .goto(duongdan)
    // .click('a[onclick="#places"]')
    .wait(1000)
    // .click('.fd-btn-login-new')
    // .wait(1000)
    // .insert('input[ng-model="Data.Email"]', 'systemec2017@gmail.com')
    // .type('input[ng-model="Data.Password"]', 'rootvn')
    // .click('.btn-login')
    // .wait(1000)
    .type('#pkeywords', 'quận hoàn kiếm')
    .click('.ico-search')
    .wait(1000)
    // .click('#scrollLoadingPage')
    // .wait(1000)
    .evaluate(function () {
        let res = document.querySelectorAll('.filter-result-item .result-image');
            let arr = [];
        for (let i = 0; i < res.length; i++) {
            let tm = res[i].querySelector('a').href;
            arr.push(tm + '/album-anh');
        }
        let newarr = arr.slice(1, 15);
        return newarr;
    })
    .end()
    .then(function (result) {
        // console.log(result)
        crawl(result, function (err, res) {

            if (err) {
                console.log(err.message)
            }
            // console.log(res)
            console.log('done!');
            //   exportJson(res);
        });
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

function exportJson(arr) {
    let json = {};
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        json[i] = arr[i];
    }
    let jsonString = JSON.stringify(json);
    fs.writeFile('filejson/quanhoankiem/'+ diachi +'.json', jsonString, (err) => {
        if (err) {
            console.log(err.message)
        }
        ;
        console.log('The file has been saved!');
    });
}