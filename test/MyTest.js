var assert = require('assert');
var expect = require("expect-runtime");

describe.only("", () => {

  it("", () => {
    console.log("OK");
    const language = "zh";
    const version = "0.7.0";
    delete require.cache[require.resolve('./lunr/lunr-0.7.0.min')];
    var lunr = require('./lunr/lunr-0.7.0.min');
    require('../lunr.stemmer.support.js')(lunr);
    require('../lunr.' + language + '.js')(lunr);
    const appDocs = [{
      id:1,
      name: "腾讯视频",
    },{
      id:2,
      name: "网易有道词典",
    }]
    var idx = lunr(function () {
      this.use(lunr[language]);
      this.field('name')
      appDocs.forEach(doc => {
      console.log("doc:", doc);
        this.add(doc);
      });
    })
//    expect(idx).property("pipeline").property("run").defined();
//    expect(lunr).property("tokenizer").defined();
//    const ts = lunr.zh.tokenizer("网易apple有道词典");
//    expect(ts).lengthOf(7);
//    const r = idx.pipeline.run(ts);
//    expect(r).equal(true);

    const result = idx.search("网 易")
    console.log("result:", result);
    const find = result.map(r => {
//      expectRuntime(r).match({
//        ref: expectRuntime.anything(),
//      });
      const doc = appDocs.reduce((a,c) => {
        if(c.id === parseInt(r.ref)){
          return c;
        }else{
          return a;
        }
      }, undefined);
//      expectRuntime(doc).defined();
      return doc;
    });
    console.log("find:", find);
    assert.equal(find.length, 1);
  });

});
