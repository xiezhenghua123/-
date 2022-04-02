/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 15:54:13
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-02 18:53:08
 */
const express = require('express')
const Router = express.Router
const axios = require('axios')
const cheerio = require('cheerio')
const router = new Router()

const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, X-E4M-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

axios
  .get('https://xtu.jysd.com/teachin', {
    headers: {
      'user-agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    },
  })
  .then(res => {
    let html = res.data
    const $ = cheerio.load(html)
    $('.header').remove()
    $('.footer').remove()

    router.get('/getJobList', (req, res, next) => {
      res.send({ data: $.html() })
      console.log($.html())
    })
  })

app.use('/', router)
app.listen(3000, '127.0.0.1', function () {
  console.log('listen at http://localhost:3000/')
})
