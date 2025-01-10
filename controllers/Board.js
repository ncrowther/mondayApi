'use strict';

var request = require('request');

module.exports.boardGET = function boardGET(req, res, next, board) {

  console.log('Get Monday Board ' + board)

  console.log(req.headers);

  // Get bearer token 
  const bearerToken = req.headers.authorization;
  console.log("Bearer Token: " + bearerToken);

  const graphqlGetBoardItems = 'query {boards (ids: ' + board + ') {items_page {cursor items {id name column_values {text type value column {title} }}}}}'

  // API
  const mondayURL = 'https://api.monday.com/v2/'

  var options = {
    method: 'POST',
    url: mondayURL,
    headers: {
      Authorization: bearerToken,
     },
    body: JSON.stringify({
      "query": graphqlGetBoardItems
    })
  }
  request(options, function (error, response) {
    if (error) {
      const errorResponse = { response: '99: Error in get: ' + error }
      console.error(errorResponse)
      res.send(errorResponse)
    } else {
      const responseStr = response.body
      const responseJson = JSON.parse(responseStr)
      console.log(responseJson)

      let docs = []
      const hashMap = new Map();
      var i = 0
      for (i in responseJson.data.boards[0].items_page.items) {
        const boardItem = responseJson.data.boards[0].items_page.items[i]
        let category = boardItem.name
        var j = 0
        for (j in boardItem.column_values) {
          const columnInfo = boardItem.column_values[j]
          hashMap.set(columnInfo.column.title, columnInfo.text);
        }

        if (hashMap.get('Request Status') === 'Approved') {

          let doc = {
            "question": hashMap.get('Question'),
            "choice1": hashMap.get('Choice1'),
            "choice2": hashMap.get('Choice2'),
            "choice3": hashMap.get('Choice3'),
            "choice4": hashMap.get('Choice4'),
            "choice5": hashMap.get('Choice5'),
            "answer": hashMap.get('Answer'),
            "image": hashMap.get('Image'),
            "category": category
          }

          docs.push(doc)
        }

      }

      const returnResponse = { Docs: docs }
      console.log(returnResponse)
      res.send(returnResponse)
    }

  })
}