
    const fs = require('fs')
    , ini = require('ini');

function config_stel(){

    console.log("in form read function");
    var name = document.getElementById("name").value;
    var offset = document.getElementById("offset").value;
    var ip_addr = document.getElementById("ip_addr").value;
    var this_pc = document.getElementById("this_pc").value;

    var config = ini.parse(fs.readFileSync('/home/mithil/.stellarium/config.ini', 'utf-8'));
    
    var data= {offset : offset,
    ip_addr : ip_addr,
    thisPC : this_pc
    }
    config.LGConnect= data;

    fs.writeFileSync('/home/mithil/.stellarium/config.ini', ini.stringify(config, { section: '' }))
}