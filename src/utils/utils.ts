import { Response } from "express";
import mongoose from "mongoose";
import { HOST } from "./consts";
import request from 'request'
import * as htmlparser2 from 'htmlparser2';
import cheerio from 'cheerio';

export default class Utils {
  public static handleError = async (err: any, res: Response) => {
    return res.status(403).json({ msg: err });
  };

  /**
   * This function returns an ObjectId embedded with a given datetime
   * Accepts both Date object and string input
   */ 
  public static objectIdWithTimestamp = (timestamp) => {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof(timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }
    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp/1000).toString(16);
    // Create an ObjectId with that hex timestamp
    var constructedObjectId = mongoose.Types.ObjectId(hexSeconds + "0000000000000000");
    return constructedObjectId
  }

  // await-request.js
  public static asyncRequest = async (value) => 
  new Promise((resolve, reject) => {
      request(value, (error, response, data) => {
          if(error) reject(error)
          else resolve(response)
      })
  })

  public static executeRequestUsingRequest = async (options) => {
    if (!options.headers) {
      options.headers = {}
    }
    // Set user cookies if exist
    // if (userCookies) {  // currently not in use
    //   options.headers['Cookie'] = userCookies
    // }
    // Override Origin/Host values
    options.headers['Host'] = HOST
    return await Utils.asyncRequest(options)
  }

  public static fetchHtmlPage = async(url) => {
    const options = {
      'method': 'GET',
      url,
      'headers': {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
      }
    }
    return await Utils.executeRequestUsingRequest(options)
  }

  public static fetchHtmlData = async (indiceObj) => {
    const serverRes: any = await Utils.fetchHtmlPage(`https://www.google.com`)
  
    const headerNames = []
    const investingIndicesTechnicalSummary = {}
    const serverResTemplate = serverRes.body // (html content)
  
    // parse html content
    const dom: any = htmlparser2.parseDOM(serverResTemplate);
    const $ = cheerio.load(dom)
    // $('.genTbl.closedTbl.technicalSummaryTbl tr th').each((i, el) => {
    //   if (i!==0) {
    //     // headers
    //     const headerName = el.children[0].data
    //     headerNames.push(headerName)
    //   }
    // })
    // const tdList = $('.genTbl.closedTbl.technicalSummaryTbl tr td')
    // tdList.each((i, el) => {
    //   const val = el.children[0].data
    //   if (i % 6 === 0) {
    //     // Type coloumn
    //     investingIndicesTechnicalSummary[val] = {}
    //   } else {
    //     // Other columns
    //     const relatedRowType = tdList[Math.floor(i/6)*6].children[0].data
    //     const relatedHeaderName = headerNames[i%6-1]
    //     investingIndicesTechnicalSummary[relatedRowType][relatedHeaderName] = val
    //   }
    // })
    return {}
  }
}
