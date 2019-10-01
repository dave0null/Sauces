/*
 * Angular vs Angular js?
 * webpack
 * bower
 * gulp
 * react
 *
 * http://esoft.lk/computer-studies/language-academy/english-language-tests/ielts/
 */

// INCLUDES
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

// CODE
// website takes an input URL from esoft
// website scrape it into file/ or something for easy copy
// optional we can choose to filter by tags

var url = "http://esoft.lk/computer-studies/language-academy/english-language-tests/ielts/";
request(url, function(error, response, body){

  if(error)
    console.log('ERROR: '+error);

  console.log("status code: "+response.statusCode);
  var $ = cheerio.load(body);

  $('div.welcome-text').each(function(index){
    var title = $(this).find('h2.dot').text().trim();
    console.log('TITLE: '+title);

    // for each tab
    console.log($('ul.nav-tabs').children().text());
  });
});