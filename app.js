
    const fs = require('fs')
    , ini = require('ini');
    const cp = require("child_process");
    var dgram = require('dgram');
    var ip = require("ip");
    var ip_addr ;
    var name ;
    var this_pc;
    var displays;
    var ip_list= [];
    var PORT = 33333;
    var dgram = require('dgram');
    var client = dgram.createSocket('udp4');
    const os = require('os');
    var path;

    //check OS and set config file path
    if (process.platform == 'darwin') {
        path= os.homedir()+'/Library/Application Support/Stellarium/config.ini'
    }
    else if (process.platform == 'win32') {
        path= os.homedir()+'\\AppData\\Roaming\\Stellarium\\config.ini'
    }
    else if (process.platform == 'linux') {
        path= os.homedir()+'/.stellarium/config.ini'
    }


    // update config file 
function config_stel(){

    console.log("in form read function");
     name = document.getElementById("name").value;
    var Hoffset = document.getElementById("Hoffset").value;
    var Voffset = document.getElementById("Voffset").value;
    ip_addr = document.getElementById("ip_addr").value;
    this_pc = document.getElementById("this_pc").value;
    displays= document.getElementById("displays").value;

    var config = ini.parse(fs.readFileSync(path, 'utf-8'));
    
    var data= {Hoffset : Hoffset,
        Voffset : Voffset,
    ip_addr : ip_addr,
    thisPC : this_pc
    }
    config.LGConnect= data;
    config.

    fs.writeFileSync(path, ini.stringify(config, { section: '' }))

    if (this_pc== 1) {
        socket_server();
    }
    else if (this_pc== 0){
        socket_client();
        
    }
}

// switch master/slave
function thisPC_changed(){
    if (document.getElementById("this_pc").value== 1){
        document.getElementById("name-div").style.display = 'none';
        document.getElementById("ip_addr-div").style.display = 'none';
        document.getElementById("Hoffset-div").style.display = 'none';
        document.getElementById("Voffset-div").style.display = 'none';
        document.getElementById("displays-div").style.display = 'block';
        document.getElementById("addr_para-div").style.display = 'block';
    }
    else {
        document.getElementById("name-div").style.display = 'block';
        document.getElementById("ip_addr-div").style.display = 'block';
        document.getElementById("Hoffset-div").style.display = 'block';
        document.getElementById("Voffset-div").style.display = 'block';
        document.getElementById("displays-div").style.display = 'none';
        document.getElementById("addr_para-div").style.display = 'none';
    }
}

// check initially for master or slave
thisPC_changed()
document.getElementById("addr_para").innerHTML="<b>IP address: </b>"+ ip.address();



// launch Stellarium
function launch_stel(){
    cp.exec("stellarium"); // launch in master
    var HOST = ip_addr;

    // wait for 5 sec and launch in slave
    setTimeout(()=>{
        if (this_pc== 1){
            var message = 'Launch_Stellarium';
            
            //var message= "Launch Stellarium";
            for (let i=0; i<ip_list.length; i++){
                client.send(message, 0, message.length, PORT, ip_list[i], function(err, bytes) {
                    if (err) throw err;
                    console.log('UDP message sent to ' + ip_list[i] +':'+ PORT);
                    client.close();
                });
            }
        }
    } 
    , 5000);


}

// socket connection server
function socket_server(){
    // var PORT = 33333;
    var HOST =   ip.address();
    
    var server = dgram.createSocket('udp4');
    server.on('listening', function() {
        var address = server.address();
        //console.log('UDP Server listening on ' + address.address + ':' + address.port);
        //ip_list.push(address.address);
    });
    server.on('message', function(message, remote) {
        console.log(remote.address + ':' + remote.port +' - ' + message);
        var msg_arr = message.toString().split("-");

        // launch stellarium signal
        if (msg_arr[0]== "Launch_Stellarium") {
            cp.exec("stellarium");
        }
        // add names of those who connected 
        if (msg_arr[0]== "connect") {
            ip_list.push(remote.address);
            var node = document.createElement("LI");                 // Create a <li> node
            var textnode = document.createTextNode(msg_arr[1]);         // Create a text node
            node.appendChild(textnode);                              // Append the text to <li>
            document.getElementById("connected_ul").appendChild(node); 
        }

        if (ip_list.length== displays-1){
            launch_stel();
        }
    });
    server.bind(PORT, HOST);
}

// socker connection client
function socket_client(){
    
    var HOST = ip_addr;
    var message = 'connect-'+ name;

    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
        client.close();
    });
    socket_server();
    
}