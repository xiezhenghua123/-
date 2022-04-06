/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 15:54:13
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-04 13:11:07
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

const getJobList = page => {
  return new Promise((reslove, rej) => {
    axios
      .get(`https://xtu.jysd.com/teachin?page=${page}`, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        },
      })
      .then(res => {
        let html = res.data
        const link_reg =
          /<link(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/link>)*/gm
        const a_reg =
          /<a(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/a>)*/gm
        const js_reg =
          /<script(?:.*?)src=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/gm
        const img_reg =
          /<img(?:.*?[\n\r\s]*.*?)src=[\'\"](.+?)[\'\"](?!<)(?:.*?[\n\r\s]*.*?)\/*>/gm
        const $ = cheerio.load(html)
        const data = $('.mescroll')
          .html()

          .replace(img_reg, function ($1, $2) {
            return `<img src="https://xtu.jysd.com${$2}"></img>`
          })
          .replace(a_reg, function ($1, $2) {
            return `<a href="https://xtu.jysd.com${$2}">`
          })
        reslove(data)
      })
  })
}
const getGameList = (page = 2) => {
  return new Promise((reslove, rej) => {
    axios
      .get(`https://m.saikr.com/vs/ajaxGetList?page=${page}`, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        },
      })
      .then(res => {
        let html = res.data.data.list
        // const link_reg =
        //   /<link(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/link>)*/gm
        // const a_reg =
        //   /<a(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/a>)*/gm
        // const js_reg =
        //   /<script(?:.*?)src=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/gm
        // const img_reg =
        //   /<img(?:.*?[\n\r\s]*.*?)src=[\'\"](.+?)[\'\"](?!<)(?:.*?[\n\r\s]*.*?)\/*>/gm
        const $ = cheerio.load(html)
        console.log($._root)
        const data = $('a').each((index, ele) => {
          const $$ = cheerio.load($(ele).html())
          let obj = {}
          obj['clickHref'] = $(ele).addr('href')
          obj['img'] = $$('img').addr('src')
          obj['title'] = $$('.item-tag-box .item-tit').text()
          obj['deadlineDays'] = $$('.item-tag-box .num').text()
          obj[''] = $$('.item-time li').text()
          console.log($$.html())
        })
        // .html()

        // .replace(img_reg, function ($1, $2) {
        //   return `<img src="https://xtu.jysd.com${$2}"></img>`
        // })
        // .replace(a_reg, function ($1, $2) {
        //   return `<a href="https://xtu.jysd.com${$2}">`
        // })
        // reslove(data)
      })
  })
}
getGameList().then(res => {
  // console.log(res)
})
router.get('/getJobList', (req, res, next) => {
  getJobList(req.query.page).then(data => {
    res.send({ data: data })
  })
})
app.use('/', router)
const port = process.env.PORT || 80
app.listen(port, () => {
  console.log('服务启动成功，端口：', port)
})
