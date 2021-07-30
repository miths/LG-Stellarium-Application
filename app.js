
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
    
    var LGConnect= {Hoffset : Hoffset,
        Voffset : Voffset,
    ip_addr : ip_addr,
    thisPC : this_pc
    }

    var plugins_load_at_startup= {
        AngleMeasure                           : false,
        ArchaeoLines                           : false,
        Calendars                              : false,
        EquationOfTime                         : false,
        Exoplanets                             : true,
        FOV                                    : true,
        MeteorShowers                          : true,
        NavStars                               : false,
        Novae                                  : true,
        Observability                          : false,
        Oculars                                : true,
        PointerCoordinates                     : false,
        Pulsars                                : true,
        Quasars                                : true,
        RemoteControl                          : false,
        RemoteSync                             : false,
        Satellites                             : true,
        Scenery3d                              : false,
        SolarSystemEditor                      : true,
        Supernovae                             : true,
        TelescopeControl                       : false,
        TextUserInterface                      : false,
    }

    var Exoplanets= {
        distribution_enabled                   : true,
        enable_at_startup                      : true,
        exoplanet_marker_color                 : "0.400000,0.900000,0.500000",
        flag_show_designations                 : true,
        flag_show_exoplanets_button            : true,
        habitable_enabled                      : false,
        habitable_exoplanet_marker_color       : "1.000000,0.500000,0.000000",
        last_update                            : "2021-07-27T23:58:06",
        temperature_scale                      : "Celsius",
        timeline_enabled                       : false,
        update_frequency_hours                 : 72,
        updates_enabled                        : true,
        url                                    : "https://www.stellarium.org/json/exoplanets.json" ,
    }

    var Pulsars= {
        distribution_enabled                   : true,
        enable_at_startup                      : true,
        filter_enabled                         : false,
        filter_value                           : "150.00",
        flag_show_pulsars_button               : true,
        glitch_color                           : "0.2,0.3,1.0",
        last_update                            : "2021-07-30T17:15:16",
        marker_color                           : "0.4,0.5,1.0",
        update_frequency_days                  : "100",
        updates_enabled                        : true,
        url                                    : "https://stellarium.org/json/pulsars.json",
        use_separate_colors                    : false,
    }

    var Satellites= {
        auto_add_enabled                       : true,
        auto_remove_enabled                    : true,
        hide_invisible_satellites              : false,
        hint_color                             : "0.0,0.4,0.6",
        hint_font_size                         : "10",
        iconic_mode_enabled                    : true,
        invisible_satellite_color              : "1.0000000000,0.0000000000,0.0000000000",
        last_update                            : "2021-07-27T23:58:09",
        orbit_fade_segments                    : 5,
        orbit_line_flag                        : true,
        orbit_line_segments                    : "90",
        orbit_segment_duration                 : "20",
        show_satellite_hints                   : true,
        show_satellite_labels                  : true,
        "tle_sources/1/add_new"                : true,
        "tle_sources/1/url"                      : "http://www.celestrak.com/NORAD/elements/visual.txt",
        "tle_sources/10/url"                     : "http://www.celestrak.com/NORAD/elements/iridium-NEXT.txt",
        "tle_sources/11/url"                     : "http://www.celestrak.com/NORAD/elements/geo.txt",
        "tle_sources/12/add_new"                 : true,
        "tle_sources/12/url"                     : "http://www.celestrak.com/NORAD/elements/stations.txt",
        "tle_sources/13/url"                     : "http://www.celestrak.com/NORAD/elements/weather.txt",
        "tle_sources/14/url"                     : "http://www.celestrak.com/NORAD/elements/resource.txt",
        "tle_sources/15/url"                     : "http://www.celestrak.com/NORAD/elements/sarsat.txt",
        "tle_sources/16/url"                     : "http://www.celestrak.com/NORAD/elements/dmc.txt",
        "tle_sources/17/url "                    : "http://www.celestrak.com/NORAD/elements/tdrss.txt",
        "tle_sources/18/url"                     : "http://www.celestrak.com/NORAD/elements/argos.txt",
        "tle_sources/19/url"                     : "http://www.celestrak.com/NORAD/elements/intelsat.txt",
        "tle_sources/2/url"                     : "http://www.celestrak.com/NORAD/elements/tle-new.txt",
        "tle_sources/20/url"                     : "http://www.celestrak.com/NORAD/elements/gorizont.txt",
        "tle_sources/21/url"                     : "http://www.celestrak.com/NORAD/elements/raduga.txt",
        "tle_sources/22/url"                     : "http://www.celestrak.com/NORAD/elements/molniya.txt",
        "tle_sources/23/url"                     : "http://www.celestrak.com/NORAD/elements/orbcomm.txt",
        "tle_sources/24/url"                     : "http://www.celestrak.com/NORAD/elements/globalstar.txt",
        "tle_sources/25/url"                     : "http://www.celestrak.com/NORAD/elements/x-comm.txt",
        "tle_sources/26/url"                     : "http://www.celestrak.com/NORAD/elements/other-comm.txt",
        "tle_sources/27/add_new"                 : true,
        "tle_sources/27/url"                     : "http://www.celestrak.com/NORAD/elements/glo-ops.txt",
        "tle_sources/28/add_new"                 : true,
        "tle_sources/28/url"                     : "http://www.celestrak.com/NORAD/elements/beidou.txt",
        "tle_sources/29/url"                     : "http://www.celestrak.com/NORAD/elements/sbas.txt",
        "tle_sources/3/add_new"                  : true,
        "tle_sources/3/url"                      : "http://www.celestrak.com/NORAD/elements/science.txt",
        "tle_sources/30/url"                     : "http://www.celestrak.com/NORAD/elements/nnss.txt",
        "tle_sources/31/url"                     : "http://www.celestrak.com/NORAD/elements/engineering.txt",
        "tle_sources/32/url"                     : "http://www.celestrak.com/NORAD/elements/education.txt",
        "tle_sources/33/url"                     : "http://www.celestrak.com/NORAD/elements/geodetic.txt",
        "tle_sources/34/url"                     : "http://www.celestrak.com/NORAD/elements/radar.txt",
        "tle_sources/35/url"                     : "http://www.celestrak.com/NORAD/elements/cubesat.txt",
        "tle_sources/36/url"                     : "http://www.celestrak.com/NORAD/elements/other.txt",
        "tle_sources/37/add_new"                 : true,
        "tle_sources/37/url"                     : "http://www.celestrak.com/NORAD/elements/supplemental/starlink.txt",
        "tle_sources/38/url"                     : "https://www.amsat.org/amsat/ftp/keps/current/nasabare.txt",
        "tle_sources/39/url"                     : "http://www.celestrak.com/NORAD/elements/oneweb.txt",
        "tle_sources/4/url"                      : "http://www.celestrak.com/NORAD/elements/noaa.txt",
        "tle_sources/40/url"                     : "http://www.celestrak.com/NORAD/elements/planet.txt",
        "tle_sources/5/url"                      : "http://www.celestrak.com/NORAD/elements/goes.txt",
        "tle_sources/6/add_new"                  : true,
        "tle_sources/6/url"                      : "http://www.celestrak.com/NORAD/elements/amateur.txt",
        "tle_sources/7/add_new"                  : true,
        "tle_sources/7/url"                      : "http://www.celestrak.com/NORAD/elements/gps-ops.txt",
        "tle_sources/8/add_new"                  : true,
        "tle_sources/8/url"                      : "http://www.celestrak.com/NORAD/elements/galileo.txt",
        "tle_sources/9/url"                      : "http://www.celestrak.com/NORAD/elements/iridium.txt",
        "tle_sources/size"                       : 40,
        transit_satellite_color                : "0.0,0.0,0.0",
        update_frequency_hours                 : 72,
        updates_enabled                        : true,
    }

    var Quasars= {
        distribution_enabled                   : true,
        enable_at_startup                      : true,
        flag_show_quasars_button               : true,
        flag_use_markers                       : true,
        last_update                            : "2021-07-30T17:38:05",
        marker_color                           : "1.000000,0.500000,0.400000",
        update_frequency_days                  : 100,
        updates_enabled                        : true,
        url                                    : "https://stellarium.org/json/quasars.json",

    }


    config.LGConnect= LGConnect;
    config.plugins_load_at_startup= plugins_load_at_startup;
    config.Exoplanets= Exoplanets;
    config.Pulsars= Pulsars;
    config.Quasars= Quasars;

    // config.plugins_load_at_startup.Novae= true;
    // config.plugins_load_at_startup.Satellites= true;
    // config.plugins_load_at_startup.Supernovae= true;
    // config.plugins_load_at_startup.Pulsars= true;
    // config.plugins_load_at_startup.Exoplanets= true;

    // config.Exoplanets.enable_at_startup= true;
    // config.Exoplanets.distribution_enabled= true;

    // config.Pulsars.enable_at_startup= true;
    // config.Pulsars.distribution_enabled= true;

    // config.Quasars.enable_at_startup= true;
    // config.Quasars.distribution_enabled= true;

    // config.Satellites.auto_add_enabled= true;
    // config.Satellites.hide_invisible_satellites= true;



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