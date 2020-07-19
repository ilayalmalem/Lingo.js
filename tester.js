const Lingo = require('./index.js')

var ds = new Lingo.Lingo('.s',{
    Models: {
        op:'ds',
        tr:'NoConflict'
    }
})
var dss = new Lingo.LingoNetwork()

console.table(ds.data.Models)