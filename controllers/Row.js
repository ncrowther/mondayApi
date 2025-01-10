'use strict';

var request = require('request');

module.exports.rowPOST = function rowPOST(req, res, next, body, board) {

  console.log('Write item to Monday Board ' + board)

  console.log(req.headers);

  // Get bearer token 
  const bearerToken = req.headers.authorization;
  console.log("Bearer Token: " + bearerToken);

  const questionRec = req.body;
  let category = questionRec.category
  let question = questionRec.question
  let answer = questionRec.answer
  let choice1 = questionRec.choice1
  let choice2 = questionRec.choice2
  let choice3 = questionRec.choice3
  let choice4 = questionRec.choice4
  let choice5 = questionRec.choice5
  let image = questionRec.image

  question = question.replace("%20", " ");
  console.log('Question:' + question)

  answer = answer.replace("%20", " ");
  console.log('Answer:' + answer)

  choice1 = choice1.replace("%20", " ");
  console.log('choice1:' + choice1)

  if (!question) {
    const errorResponse = { response: '99: No data provided in query ' }
    console.log(errorResponse)
    res.send(errorResponse)
  } else {

     const graphqlCreateItem = 'mutation {create_item (board_id: ' + board + ',  item_name: "' + category + '", column_values: \"{\\\"question\\\" :\\\"' + question + '\\\",\\\"answer\\\":\\\"' + answer + '\\\" ,\\\"choice1\\\":\\\"' + choice1 + '\\\" ,\\\"choice2\\\":\\\"' + choice2 + '\\\" ,\\\"choice3\\\":\\\"' + choice3 + '\\\" ,\\\"choice4\\\":\\\"' + choice4 + '\\\" ,\\\"choice5\\\":\\\"' + choice5 + '\\\", \\\"image\\\":\\\"' + image + '\\\"  }\") {id}}'
    
     // API
    const mondayURL = 'https://api.monday.com/v2/'

    var options = {
      method: 'POST',
      url: mondayURL,
      headers: {
        Authorization: bearerToken,
      },
      body: JSON.stringify({
        "query": graphqlCreateItem
      })
    }
    request(options, function (error, response) {
      if (error) {
        const errorResponse = { response: '99: Error: ' + error }
        console.log(errorResponse)
        res.send(errorResponse)
      } else {
        const responseStr = response.body
        const returnResponse = { response: responseStr }
        console.log(returnResponse)
        res.send(returnResponse)
      }
    })
  }
}


