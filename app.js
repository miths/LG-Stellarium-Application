
    const fs = require('fs')
    , ini = require('ini');
    const cp = require("child_process");
    var dgram = require('dgram');
    var ip = require("ip");
    var ip_addr ;
    var ip_list= [];
    var PORT = 33333;
    var dgram = require('dgram');
    var client = dgram.createSocket('udp4');

function config_stel(){

    console.log("in form read function");
    var name = document.getElementById("name").value;
    var offset = document.getElementById("offset").value;
    ip_addr = document.getElementById("ip_addr").value;
    var this_pc = document.getElementById("this_pc").value;

    var config = ini.parse(fs.readFileSync('/home/mithil/.stellarium/config.ini', 'utf-8'));
    
    var data= {offset : offset,
    ip_addr : ip_addr,
    thisPC : this_pc
    }
    config.LGConnect= data;

    fs.writeFileSync('/home/mithil/.stellarium/config.ini', ini.stringify(config, { section: '' }))

    if (this_pc== 1) {
        socket_server();
    }
    else if (this_pc== 0){
        socket_client();
    }
}


function launch_stel(){
    cp.exec("stellarium"); // notice this without a callback..
    var HOST = ip_addr;
    if (this_pc== 1){
        
        var message = new Buffer('Launch Stellarium');
        
        //var message= "Launch Stellarium";
        for (let i=0; i<ip_list.length; i++){
            client.send(message, 0, message.length, PORT, ip_list[i], function(err, bytes) {
                if (err) throw err;
                console.log('UDP message sent to ' + ip_list[i] +':'+ PORT);
                client.close();
            });
        }
    }
    //process.exit(0); // exit this nodejs process

}


function socket_server(){
    // var PORT = 33333;
    var HOST =   ip.address();
    console.log("in server fn");
    
    var server = dgram.createSocket('udp4');
    server.on('listening', function() {
        var address = server.address();
        console.log('UDP Server listening on ' + address.address + ':' + address.port);
        //ip_list.push(address.address);
    });
    var launched= false;
    while(launched== false){
        server.on('message', function(message, remote) {
            console.log(remote.address + ':' + remote.port +' - ' + message);
            if (message== "Launch Stellarium") {
                cp.exec("stellarium");
                launched= true;
            }
            ip_list.push(remote.address)
        });
    }

    server.bind(PORT, HOST);
}

function socket_client(){
    
    var HOST = ip_addr;
    console.log("in client fn");
    var message = new Buffer('My KungFu is Good!');

    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
        client.close();
    });
    socket_server();
    
}