// Dom7
// File Location : MOOE-WEB/js/app.js
var $$ = Dom7;
    // Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.deped.mooe', // App bundle ID
  name: 'DEPED MOOE', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ],
      uploadcomplete:null,
      googleprofile: {},
      googletoken: null,
      collist: {},
      sdolist: {},
      sreglist: {},
      schlist: {},
      rolelist: {},
      flowtypelist: {},
      statuslist: {},
      paplist: {},
      fundsource: {},
      coa: {},
      trantypes: {},
      vatmatrix: {},
      vattypes: {},
      months: {},
      userdata:{},
      gadmindata:{},
      brokerdata:{}
    };
  },
  // App root methods
  methods: {
    continue: function () {
      //continue to dashboard
      app.views.main.router.navigate('/dashboard/')
    },
    fetchsigninroles: function () {
      //continue to dashboard
      app.preloader.show();
      app.request.post($base_url+'sysroles/read_signin_roles.php' ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.rolelist=data;
        var rolelistel = app.autocomplete.create({
          inputEl: '.roledescription',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#roleguid')[0].value="";
            list=app.data.rolelist.records;
            for (var i = 0; i < list.length; i++) {
              if (list[i].roledescription.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": list[i].roleguid,"name": list[i].roledescription ,"tag" : list[i].roletype,"rolegroup" : list[i].rolegroup}); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#roledescription')[0].value=value[i].name;
                $$('#roleguid')[0].value=value[i].id;
                $$('#roletype')[0].value=value[i].tag;
                console.log( $$('#rolegroup').length +":" + value[i].rolegroup )
                if ( $$('#rolegroup').length>0) {
                  $$('#rolegroup')[0].value=value[i].rolegroup;
                }
                //populate schools 
               
              }
              
            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
    },
    fetchroles: function () {
      //continue to dashboard
      var udata= { 
        
         roleguid: app.data.userdata.roleguid   
        
      }
      app.preloader.show();
      app.request.post($base_url+'sysroles/read_roles.php',JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.rolelist=data;
        var rolelistel = app.autocomplete.create({
          inputEl: '.roledescription',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#gsysrole')[0].value="";
            list=app.data.rolelist.records;
            for (var i = 0; i < list.length; i++) {
              if (list[i].roledescription.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": list[i].roleguid,"name": list[i].roledescription ,"tag" : list[i].roletype ,"rolegroup" : list[i].rolegroup}); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#roledescription')[0].value=value[i].name;
                $$('#gsysrole')[0].value=value[i].id;
                console.log( $$('#rolegroup').length +":" + value[i].rolegroup )
                if ( $$('#rolegroup').length>0) {
                  $$('#rolegroup')[0].value=value[i].rolegroup;
                }
                // $$('#roletype')[0].value=value[i].tag;
                //populate schools 
               
              }
              
            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
    },
    fetchctmor: function () {
      //continue to dashboard
      var udata= { 
        
         roleguid: app.data.userdata.roleguid   
        
      }
      app.preloader.show();
      app.request.post($base_url+'mor/read_paging.php',JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.rolelist=data;
        var rolelistel = app.autocomplete.create({
          inputEl: '.mordesc',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#morguid')[0].value="";
            list=app.data.rolelist.records;
            for (var i = 0; i < list.length; i++) {
              if (list[i].mordesc.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": list[i].morguid,"name": list[i].mordesc }); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#mordesc')[0].value=value[i].name;
                $$('#morguid')[0].value=value[i].id;
                // $$('#roletype')[0].value=value[i].tag;
                //populate schools 
               
              }
              
            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
    },
    fetchflowtypes: function () {
      // continue to dashboard
      var udata= { 
        
         roleguid: app.data.userdata.roleguid   
        
      }
      app.preloader.show();
      app.request.post($base_url+'flowtypes/read_paging.php',JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   flowtypelist: data   
        // })
        app.data.flowtypelist=data;
        var ftlistel = app.autocomplete.create({
          inputEl: '.flowtype',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#type')[0].value="";
            list=app.data.flowtypelist.records;
            for (var i = 0; i < list.length; i++) {
              if (list[i].description.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": list[i].ftypeid,"name": list[i].description }); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#flowtype')[0].value=value[i].name;
                $$('#type')[0].value=value[i].id;
                // $$('#roletype')[0].value=value[i].tag;
                //populate schools 
               
              }
              
            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
    },
    fetchstatuslist: function () {
      //continue to dashboard
      var udata= { 
        
         roleguid: app.data.userdata.roleguid   
        
      }
      app.preloader.show();
      app.request.post($base_url+'wfstatus/read_paging.php',JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   statuslist: data   
        // })
        app.data.statuslist=data;
        var statlistel = app.autocomplete.create({
          inputEl: '.name',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#status')[0].value="";
            list=app.data.statuslist.records;
            for (var i = 0; i < list.length; i++) {
              if (list[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": list[i].id,"name": list[i].name }); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#name')[0].value=value[i].name;
                $$('#status')[0].value=value[i].id;
                // $$('#roletype')[0].value=value[i].tag;
                //populate schools 
               
              }
              
            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
    },
    requestaccess: function () {
      //continue to dashboard
      // console.log (
      //    $$('#roleguid')[0].value  + ' ' + 
      //    $$('#roletype')[0].value  + ' ' + 
      //    $$('#schdivid')[0].value  + ' ' + 
      //    $$('#schguid')[0].value
      // );
      var guserid=app.data.userdata.guserid;
      var roleguid= $$('#roleguid')[0].value ;
      var roletype= $$('#roletype')[0].value ; 
      var rolegroup= $$('#rolegroup')[0].value ; 
      var schregid= $$('#schregid')[0].value ; 
      var schdivid= $$('#schdivid')[0].value ; 
      var schguid= $$('#schguid')[0].value ;
      //school level assignments 
      var es= $$('#ES')[0].checked ;
      var jhs= $$('#JHS')[0].checked ;
      var shs= $$('#SHS')[0].checked ;



      //Validate Entries
      var errflag=0;
      var errmsg="Please ensure that you have selected correctly. <br/> Fields are required: <br/><br/>"
      if (roleguid==''){
        errflag=1;
        errmsg=errmsg + "Primary Role<br\>"
      }
      
      if (rolegroup=='S'){
        if (schdivid=='') {
          errflag=1;
          errmsg=errmsg + "Division<br\>"
        }
        if (schguid=='') {
          errflag=1;
          errmsg=errmsg + "School<br\>"
        } else {
          if ((es==false ) && (jhs==false ) && (shs==false )) {
            errflag=1;
            errmsg=errmsg + "School Assignment<br\>"
          }

        }
        

      }  
      if ((rolegroup=='D')) {
        if (schregid=='') {
          errflag=1;
          errmsg=errmsg + "Region<br\>"
         }
        if (schdivid=='') {
         errflag=1;
         errmsg=errmsg + "Division<br\>"
        }
      }

      if ((rolegroup=='R')) {
        if (schregid=='') {
          errflag=1;
          errmsg=errmsg + "Region<br\>"
         }
       
      }

      if (errflag==1) {
        app.dialog.alert(errmsg);
      } else {
        //Send request
        // return ;
        var udata= { 
          "gdivision":schdivid,
          "schregid": schregid,
          "gsysuserid":guserid,
          "gsysrole":roleguid,
          "gschool":schguid,
          "es": (es=== true ? "Y" : "N"),
          "jhs": (jhs === true ? "Y" : "N"),
          "shs": (shs === true ? "Y" : "N") 
          
        }
        // console.log(udata);
        // return;
        app.request.post($base_url+'/sysdivusers/create.php' ,  JSON.stringify(udata) , (data)=> {
          data=JSON.parse(data)
          // app.$setState({
          //   sdolist: data   
          // })
         //  app.data.sdolist=data;
         if (data.status==1) {
            app.dialog.alert(data.message,function(){location.reload();});
         } else {
            app.dialog.alert(data.message);
         }
          
        });
      }

    },
    fetchshools: function (schdivid,idel,descel) {
       //continue to dashboard
       app.preloader.show();
       var udata= { 
        "schdivid":schdivid,        
      }
      app.data.schlist=[];
       app.request.post($base_url+'schools/schools_by_div.php' ,  JSON.stringify(udata) , (data)=> {
         data=JSON.parse(data)
         // app.$setState({
         //   sdolist: data   
         // })
        //  app.data.sdolist=data;
        app.data.schlist=data;
         var sdolistel = app.autocomplete.create({
           inputEl: '.'+descel,
           openIn: 'dropdown',
           valueProperty: 'id',
           textProperty: 'name',
           closeOnSelect: true,
           source: function (query, render) {
             var results = [];
            //  if (query.length === 0) {
            //    render(results);
            //    return;
            //  }
            console.log('pop schoo');
             $$('#'+idel)[0].value="";
             schlist=app.data.schlist.records;
            //  console.log(schlist);
             for (var i = 0; i < schlist.length; i++) {
               if (schlist[i].schdescription.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                 results.push({ "id": schlist[i].schguid,
                              "name": schlist[i].schoolid +" | " + schlist[i].schdescription,
                              "ES" : schlist[i].ES, 
                              "JHS" : schlist[i].JHS,
                              "SHS" : schlist[i].SHS 
                              }); //
                  
                 
               }
             }
             
             render(results);
           },
           on: {
             change: function (value) {
               var itemText = [],
                   inputValue = [];
               for (var i = 0; i < value.length; i++) {
                 // itemText.push(value[i].name);
                 // inputValue.push(value[i].id);
                 $$('#'+descel)[0].value=value[i].name;
                 $$('#'+idel)[0].value=value[i].id;
                 //
                 
                
                var es=value[i].ES;
                var jhs=value[i].JHS;
                var shs=value[i].SHS;
                app.methods.fetchaccounts(value[i].id,es,jhs,shs);
                // app.methods.fetchpaplist(false,es,jhs,shs);
                try {
                  $$('#'+idel+"ES")[0].value=value[i].ES;
                  $$('#'+idel+"JHS")[0].value=value[i].JHS;
                  $$('#'+idel+"SHS")[0].value=value[i].SHS;
                  if (value[i].ES=='Y') {
                    $$('#ESline')[0].style.display='';
                  } else {
                    $$('#ESline')[0].style.display='none';
                  }
                  if (value[i].JHS=='Y') {
                    $$('#JHSline')[0].style.display='';
                  } else {
                      $$('#JHSline')[0].style.display='none';
                  }
                  if (value[i].SHS=='Y') {
                    $$('#SHSline')[0].style.display='';
                  } else {
                    $$('#SHSline')[0].style.display='none';
                  }
                  
                 } catch  {
                  //do nothing
                  console.log('no ES,JHS,SHS lines')
                 }

                 
                 
               }
               
             },
           },  
           });
         // console.log(sdolistel);
         app.preloader.hide();
       });
      
    },
    createdatepicker(value,elementid){
      //console.log('create date picker');
      // var self = this;
      //   var app = self.$app;
        //var today = new Date(value);
        var thisdate = new Date(value);
        // console.log(value);
        var calendarModal = app.calendar.create({
          inputEl: elementid,
          openIn: 'customModal',
          header: true,
          footer: true,
          // value: [
          //   thisdate.getMonth(),
          //   thisdate.getDate(),
          //   thisdate.getFullYear()
          // ],
          // dateFormat: {  year: 'numeric' ,month: 'numeric', day: 'numeric'},
          onChange: function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
            // return  value[2]  + '-' + value[0] + '-' + value[1]  //+ ' ' + values[3] + ':' + values[4];
            //return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
          },
          formatValue: function ( date) {
            // console.log(date);
            var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
          }
        });
    },
    removeQueue(sheetId,rowId){
      var self = this;
      // the code you're looking for
      // var needle = 'AL';
      var obj=app.data.uploadQueue;
      // iterate over each element in the array
      app.data.uploadQueue.splice(0,1); 
      // console.log(app.data.uploadQueue);
      // console.log(app.data.uploadQueue);
      // return;
      // for (var i = 0; i < obj.length; i++){
      //   // look for the entry with a matching `code` value
      //   if ((obj[i].sheetId == sheetId) && (obj[i].rowId == rowId) ){
      //     // we found it
      //     // obj[i].name is the matched result
      //     // return true;
      //     app.data.uploadQueue.splice(0)
      //     // console.log('Removed Queue');
      //   }
      // }
    // self.$setState({
    //   myparlays: obj   
    //   });
    // return false
    },
    uploadlines(){
        
      var self = this;
      // var app = self.$app;

        // var options={async:false};
        // console.log(app.data.uploadQueue.length)
        app.preloader.hide();
        if (app.data.uploadCancel==true){
          
          return;
        }
        if (app.data.uploadQueue.length>0){
         
          udata=app.data.uploadQueue[0];
          // return;
          app.request.post($base_url+'fileuploads/upload_line.php'+$base_param, JSON.stringify(udata) ,(responsedata)=> {
              
                responsedata=JSON.parse(responsedata)

                // console.log(responsedata.response);

                for (var i = 0; i < responsedata.response.length; i++) {

                  var data = responsedata.response[i];
                   // app.form.fillFromData('#my-upload-form',data);
                

                  if (data.status=="0"){
                    app.data.ErrMsgs=app.data.ErrMsgs.concat(data);

                  } else {
                    app.data.uploadedSuccessLines=app.data.uploadedSuccessLines+1
                  }
                  // console.log(udata);
                 
                  app.data.uploadedLines=app.data.uploadedLines+1;
                  // console.log(app.data.uploadedLines); 
                  if (app.data.uploadedLines %  25 ==0) {
                    //  sleep(5000);
                  }
                  var progress=Math.floor((app.data.uploadedLines/app.data.uploadLines)*100); 
                  // console.log(progress);
                  app.progressbar.set("#uploadprogress",progress,1);
                  app.data.curcomp.$setState({
                    uploadedLines : app.data.uploadedLines,
                    uploadLines : app.data.uploadLines                           
                  })
                  

                }
                 app.methods.removeQueue(udata.sheetId,udata.rowId);
                app.methods.uploadlines();

                
               
              
            }, (status)=>{
                console.log(status);
                app.methods.uploadlines();
            } ); 
        } else {
          var filedetails=app.data.curcomp.UploadMsgs + " [" + app.data.uploadedSuccessLines + "] records uploaded";
          
          app.data.curcomp.$setState({
            ErrMsgs : app.data.ErrMsgs ,   
            UploadMsgs: filedetails,
            uploadcomplete: true               
          });
         

          app.dialog.alert("Upload complete. \n " )
          app.popup.close("#my-progress-screen");
          app.popup.open("#my-upload-screen");
          app.preloader.hide();
        }


        // app.request({
        //               url: $base_url+'fileuploads/upload_line.php'+$base_param, 
        //               method: 'POST', 
        //               data: JSON.stringify(udata),
        //               options: {async:false}, 
                      
        //               success: function (data){
        //                    //       data=JSON.parse(data)
        //                       // app.form.fillFromData('#my-upload-form',data);
                              

        //                       if (data.status=="0"){
        //                         app.data.ErrMsgs=app.data.ErrMsgs.concat(wager);

        //                       }
                              
        //                 }
        //               });

        },
    createfundyear: function(inputEl){
      var d = new Date();
      var curryear = d.getFullYear();
      var years = [];
      //current year and previous year 
      
      var i;
      for (i = curryear-1; i < curryear +1; i++) {
        years.push(i);
      } 
      // console.log(inputEl);
      var pickerDevice = app.picker.create({
        inputEl: inputEl,
        cols: [
          {
            textAlign: 'center',
            values: years
          }
        ]
      });
      pickerDevice.value=curryear;
      // console.log(pickerDevice);
    },
    createfundyear2: function(inputEl){
      var d = new Date();
      var curryear = d.getFullYear();
      var years = [];
      //current year and previous year 
      
      var i;
      for (i = curryear; i < curryear +2; i++) {
        years.push(i);
      } 
      // console.log(inputEl);
      var pickerDevice = app.picker.create({
        inputEl: inputEl,
        cols: [
          {
            textAlign: 'center',
            values: years
          }
        ]
      });
      pickerDevice.value=curryear;
      // console.log(pickerDevice);
    },
    numberWithCommas(thisvalue) {
      return thisvalue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    toWords(num){
      var th = ['', 'thousand', 'million', 'billion', 'trillion'];
      var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
      var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
      s = num.toString();
      s = s.replace(/[\, ]/g, '');
      if (s != parseFloat(s)) return 'not a number';
      var x = s.indexOf('.');
      if (x == -1) x = s.length;
      if (x > 15) return 'too big';
      var n = s.split('');
      var str = '';
      var sk = 0;
      for (var i = 0; i < x; i++) {
          if ((x - i) % 3 == 2) {
              if (n[i] == '1') {
                  str += tn[Number(n[i + 1])] + ' ';
                  i++;
                  sk = 1;
              } else if (n[i] != 0) {
                  str += tw[n[i] - 2] + ' ';
                  sk = 1;
              }
          } else if (n[i] != 0) {
              str += dg[n[i]] + ' ';
              if ((x - i) % 3 == 0) str += 'hundred ';
              sk = 1;
          }
          if ((x - i) % 3 == 1) {
              if (sk) str += th[(x - i - 1) / 3] + ' ';
              sk = 0;
          }
      }
      if (x != s.length) {
          var y = s.length;
          str += 'pesos and ';
          
          var decimals=""
          for (var i = x + 1; i < y; i++) {
              decimals += n[i] ;
          } 
          // console.log(decimals.length);
          if (decimals.length==1) decimals += '0';

          str += app.methods.toWords(parseInt(decimals));
          str += ' centavos  ';
      }
      return str.replace(/\s+/g, ' ').toUpperCase();
    },
    
    createmonthlist: function(inputEl){
      var theMonths = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November", "December"];
      var today = new Date();
      var aMonth = today.getMonth();
      var i;
      var months=[];
      var mitems=[]
      for (i=0; i<12; i++) {

        var mitems= { 
          "monthid":aMonth+1,
          "monthdesc":theMonths[aMonth]
        }
        
        months.push(mitems);
        aMonth++;
        if (aMonth > 11) {
         aMonth = 0;
        }
      }
      app.data.months=months;
      var sdolistel = app.autocomplete.create({
        inputEl: inputEl,
        openIn: 'dropdown',
        valueProperty: 'id',
        textProperty: 'name',
        closeOnSelect: true,
        source: function (query, render) {
          var results = [];
          // if (query.length === 0) {
          //   render(results);
          //   return;
          // }
          // Find matched items
          // $$('#divdescription')[0].value="";
          $$('#dismonth')[0].value="";
          sdolist=app.data.months;
          // console.log(sdolist)
          for (var i = 0; i < sdolist.length; i++) {
            if (sdolist[i].monthdesc.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
              results.push({ "id": sdolist[i].monthid,"name":  sdolist[i].monthdesc }); //
               
              
            }
          }
          // Render items by passing array with result items
          //  console.log(results)
          render(results);
        },
        on: {
          change: function (value) {
            var itemText = [],
                inputValue = [];
            // console.log('change triggered');
            for (var i = 0; i < value.length; i++) {
              // itemText.push(value[i].name);
              // inputValue.push(value[i].id);
              $$('#monthdesc')[0].value=value[i].name;
              if ($$('#searchcmonth').length>0){
                $$('#searchcmonth')[0].value=value[i].id;
              }
              $$('#dismonth')[0].value=value[i].id;
              if ($$('#srcmonth').length>0){
                $$('#srcmonth')[0].value=value[i].id;
              }
              
              
            } 
            
          },
          close: function(value){
            console.log(value)

          },
        },  
        });
    },
    
    fetchsdolist: function (schregid) {
      //continue to dashboard
      app.preloader.show();
      var udata= { 
        "schregid":schregid        
      }
      app.request.post($base_url+'schooldivisions/read_all.php' ,JSON.stringify(udata),(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.sdolist=data;
        var sdolistel = app.autocomplete.create({
          inputEl: '.divdescription',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            if (query.length === 0) {
              // render(results);
              // return;
            }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#schdivid')[0].value="";
            sdolist=app.data.sdolist.records;
            // console.log(sdolist)
            for (var i = 0; i < sdolist.length; i++) {
              if (sdolist[i].divdescription.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": sdolist[i].schdivid,"name": '(' + sdolist[i].schregdescription + ') ' +  sdolist[i].divdescription} ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#divdescription')[0].value=value[i].name;
                $$('#schdivid')[0].value=value[i].id;
                //populate schools 
                // console.log('Populate schools')
                $$('#schdescription')[0].value="";
                $$('#schguid')[0].value="";
                app.methods.fetchshools(value[i].id,'schguid','schdescription');
              } 
              
            },
            close: function(value){
              console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      app.methods.fetchsigninroles();
    },
    fetchsreglist: function () {
      //continue to dashboard
      app.preloader.show();
      app.request.post($base_url+'schoolregions/read_paging.php' ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.sreglist=data;
        var sdolistel = app.autocomplete.create({
          inputEl: '.schregdescription',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            if (query.length === 0) {
              // render(results);
              // return;
            }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#schregid')[0].value="";
            sdolist=app.data.sreglist.records;
            // console.log(sdolist)
            for (var i = 0; i < sdolist.length; i++) {
              if (sdolist[i].schregdescription.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": sdolist[i].schregid,"name": sdolist[i].schregdescription } ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#schregdescription')[0].value=value[i].name;
                $$('#schregid')[0].value=value[i].id;
                //populate schools 
                // console.log('Populate schools')
                $$('#divdescription')[0].value="";
                $$('#schdivid')[0].value="";
                $$('#schdescription')[0].value="";
                $$('#schguid')[0].value="";
                app.methods.fetchsdolist(value[i].id);
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      app.methods.fetchsigninroles();
    },
    fetchpaplist: function (others,es="",jhs="",shs="") {
      //continue to dashboard
      app.preloader.show();
      var apipage='read_paging.php';
      if (others==true){
        apipage='read_otherspaging.php';
      }
      var udata
      if (es==""){
        udata={ 
          es:  app.data.userdata.ES,
          jhs: app.data.userdata.JHS,
          shs: app.data.userdata.SHS
        }
      } else {
        udata={ 
          es:  es,
          jhs: jhs,
          shs: shs
        }
      }

      
      app.request.post($base_url+'papcodes/'+apipage ,JSON.stringify(udata),(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.paplist=data;
        var sdolistel = app.autocomplete.create({
          inputEl: '.papsdesc',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#paps')[0].value="";
            paplist=app.data.paplist.records;
            // console.log(sdolist)
            for (var i = 0; i < paplist.length; i++) {
              if (paplist[i].papsdescription.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                var papsl="";
                if (paplist[i].es=='Y'){
                  papsl="es";
                }
                if (paplist[i].jhs=='Y'){
                  papsl="jhs";
                }
                if (paplist[i].shs=='Y'){
                  papsl="shs";
                }
                results.push({ "id": paplist[i].papguid,"name":   paplist[i].papsdescription,"gaafield":   paplist[i].gaafield,"papsl": papsl} ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#paps')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#papsdesc')[0].value=value[i].name;
                $$('#paps')[0].value=value[i].id;
                if ( $$('#gaafield').length>0){
                  $$('#gaafield')[0].value=value[i].gaafield;
                }
                if ( $$('#papsl').length>0){
                  $$('#papsl')[0].value=value[i].papsl;
                }
               
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    fetchaccounts: function (schdivguid="",es="",jhs="",shs="") {
      //continue to dashboard
      app.preloader.show();
      var apipage='read_paging.php';
      // var schdivguid="";
      var orgtable="S";
      if (schdivguid==""){
        if (app.data.userdata.rolegroup=='S') {
          schdivguid=app.data.userdata.schguid;
         
        } else {
          schdivguid=app.data.userdata.schdivid;
          var orgtable="D";
        }
      }
      var udata;
      if (es==""){
        udata= { 
          schdivguid:  schdivguid,
          guser: app.data.userdata.guserid,
          es: app.data.userdata.ES,
          jhs: app.data.userdata.JHS,
          shs: app.data.userdata.SHS,
          orgtable: orgtable
        }
      } else {
        udata= { 
          schdivguid:  schdivguid,
          guser: app.data.userdata.guserid,
          es:  es,
          jhs: jhs,
          shs: shs,
          orgtable: orgtable
        }
       
      }
      
      // var udata= { 
      //   schdivguid:  schdivguid,
      //   guser: app.data.userdata.guserid,
      //   es: app.data.userdata.ES,
      //   jhs: app.data.userdata.JHS,
      //   shs: app.data.userdata.SHS,
      //   orgtable: orgtable
      // }
      app.request.post($base_url+'schdivaccounts/'+apipage ,JSON.stringify(udata),(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.accounts=data;
        var sdolistel = app.autocomplete.create({
          inputEl: '#acctdesc',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#schacctguid')[0].value="";
            paplist=app.data.accounts.records;
            // console.log(sdolist)
            for (var i = 0; i < paplist.length; i++) {

              if (paplist[i].schbank.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                var acctsl="|";
                if (paplist[i].es[0]=='on'){
                  acctsl=acctsl+"es|";
                }
                if (paplist[i].jhs[0]=='on'){
                  acctsl=acctsl+"jhs|";
                }
                if (paplist[i].shs[0]=='on'){
                  acctsl=acctsl+"shs|";
                }
                results.push({ "id": paplist[i].ejsguid,"name":   paplist[i].schbank +":" +paplist[i].schaccount, "acctsl": acctsl} ); // 
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#schacctguid')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#acctdesc')[0].value=value[i].name;
                $$('#schacctguid')[0].value=value[i].id;
                if ( $$('#acctsl').length>0){
                  $$('#acctsl')[0].value=value[i].acctsl;
                }
               
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    fetchfundsourcelist: function (elementid) {
      //continue to dashboard
      app.preloader.show();
      var udata= { 
        "schguid":app.data.userdata.schguid, 
        es: app.data.userdata.ES,
        jhs: app.data.userdata.JHS,
        shs: app.data.userdata.SHS
      }
      
      app.request.post($base_url+'funds/read_confirmedfunds.php' , JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.fundsource=data;
        var sdolistel = app.autocomplete.create({
          inputEl: elementid,
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#fundguid')[0].value="";
            paplist=app.data.fundsource.records;
            // console.log(paplist)
            for (var i = 0; i < paplist.length; i++) {
              // console.log(paplist[i].datedesc);
              if (paplist[i].datedesc.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": paplist[i].fundguid,"name":   paplist[i].datedesc,"tag":   paplist[i].fundyear}  ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#fundguid')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#papsdescription')[0].value=value[i].name;
                $$('#fundguid')[0].value=value[i].id;
                $$('#fundyear')[0].value=value[i].tag;
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    fetchotherfundsourcelist: function (elementid,sourceorg,rolegroup) {
      //continue to dashboard
      // console.log(sourceorg + " " + rolegroup );
      app.preloader.show();
      var udata=[];
      if (rolegroup=='H') {
        udata= { 
          "cofund":"Y"
        }
      }
      if (rolegroup=='R') {
        udata= { 
          "schregid":sourceorg
        }
      }
      if (rolegroup=='D') {
        udata= { 
          "schdivid":sourceorg
        }
      }
      
      
      app.request.post($base_url+'funds/read_otherfunds.php' , JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.fundsource=data;
        var sdolistel = app.autocomplete.create({
          inputEl: elementid,
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            if ($$('#fundguid').length>0){
              $$('#fundguid')[0].value="";
            }
            
            if (typeof(app.data.fundsource.records)=='undefined') return ;
            paplist=app.data.fundsource.records;
            // console.log(paplist)
            for (var i = 0; i < paplist.length; i++) {
              // console.log(paplist[i].datedesc);
              if (paplist[i].funddesc.toLowerCase().indexOf(query.toLowerCase()) >= 0) {

                var papsl="|";
                if (paplist[i].ES=='Y'){
                  papsl=papsl+"es|";
                }
                if (paplist[i].JHS=='Y'){
                  papsl=papsl+"jhs|";
                }
                if (paplist[i].SHS=='Y'){
                  papsl=papsl+"shs|";
                }
               


                results.push({ "id": paplist[i].fundguid,"name":   paplist[i].funddesc,"fundyear":   paplist[i].fundyear,
                "papsdescription":   paplist[i].papsdescription,"paps":   paplist[i].paps ,"papsl": papsl }  ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              
              // $$('#papsdesc')[0].value="";
              if ($$('#fundguid').length>0){
                $$('#fundguid')[0].value="";
              }
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                console.log(value[i]);
                $$('#funddesc')[0].value=value[i].name;
                $$('#parentfund')[0].value=value[i].id;
                $$('#fundyear')[0].value=value[i].fundyear;
                $$('#fundyear')[0].text=value[i].fundyear;
                if ($$('#paps').length>0){
                  $$('#paps')[0].value=value[i].paps;
                  $$('#papsl')[0].value=value[i].papsl;
                  $$('#papsdesc')[0].value=value[i].papsdescription;
                }
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    fetchcoalist: function (elementid) {
      //continue to dashboard
      app.preloader.show();
      // var udata= { 
      //   "schguid":app.data.userdata.schguid
      // }
      
      app.request.post($base_url+'chartofacc/read_paging.php' ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.coa=data;
        var sdolistel = app.autocomplete.create({
          inputEl: elementid,
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#coaguid')[0].value="";
            paplist=app.data.coa.records;
            // console.log(sdolist)
            for (var i = 0; i < paplist.length; i++) {
              // console.log(aplist[i].datedesc);
              if (paplist[i].codedesc.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": paplist[i].coaguid,"name":   paplist[i].codedesc} ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#coaguid')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#coadesc')[0].value=value[i].name;
                $$('#coaguid')[0].value=value[i].id;
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    fetchtranlist: function (elementid) {
      //continue to dashboard
      app.preloader.show();
      // var udata= { 
      //   "schguid":app.data.userdata.schguid
      // }
      
      app.request.post($base_url+'vatmatrix/read_trantypes.php' ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.trantypes=data;
        var sdolistel = app.autocomplete.create({
          inputEl: elementid,
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#trantype')[0].value="";
            paplist=app.data.trantypes.records;
            // console.log(sdolist)
            for (var i = 0; i < paplist.length; i++) {
              // console.log(aplist[i].datedesc);
              if (paplist[i].trantype.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": paplist[i].trantype,"name":   paplist[i].trantype ,"tag":   paplist[i].taxoverride }  ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#trantype')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#trandesc')[0].value=value[i].name;
                $$('#trantype')[0].value=value[i].id;
                $$('#taxoverride')[0].value=value[i].tag;
                //enable tax fields 
                if (value[i].tag=='Y'){
                  $$('#netvat')[0].readOnly=false;
                  $$('#bir2306')[0].readOnly=false;
                  $$('#bir2307')[0].readOnly=false;
                } else {
                  $$('#netvat')[0].readOnly=true;
                  $$('#bir2306')[0].readOnly=true;
                  $$('#bir2307')[0].readOnly=true;
                }
                
                

                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    fetchvatlist: function (elementid) {
      //continue to dashboard
      app.preloader.show();
      // var udata= { 
      //   "schguid":app.data.userdata.schguid
      // }
      
      app.request.post($base_url+'vatmatrix/read_vattypes.php' ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.vattypes=data;
        var sdolistel = app.autocomplete.create({
          inputEl: elementid,
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#vattype')[0].value="";
            paplist=app.data.vattypes.records;
            // console.log(sdolist)
            for (var i = 0; i < paplist.length; i++) {
              // console.log(aplist[i].datedesc);
              if (paplist[i].vattype.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": paplist[i].vattype,"name":   paplist[i].vattype} ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#vattype')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#vatdesc')[0].value=value[i].name;
                $$('#vattype')[0].value=value[i].id;
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    fetchcodetables: function (others) {
      //continue to dashboard
      app.preloader.show();
      var apipage='read_ct_paging.php';
     
      app.request.post($base_url+'base/'+apipage ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.reclist=data;
        var ListEl = app.autocomplete.create({
          inputEl: '.ctabledesc',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#ctable')[0].value="";
            reclist=app.data.reclist.records;
            // console.log(sdolist)
            for (var i = 0; i < reclist.length; i++) {
              if (reclist[i].ctabledesc.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                results.push({ "id": reclist[i].ctable,"name":   reclist[i].ctabledesc} ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#ctable')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#ctabledesc')[0].value=value[i].name;
                $$('#ctable')[0].value=value[i].id;
                // $$('#deleterecords')[0].value=value[i].deleterecords;
                
                //fill field list 
                app.methods.loadctcolnames();

               
              
               
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
       
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    loadcolnames: function(){
      try {
        var filetype=$$('#my-upload-form [name="filetypeguid"]')[0].value
        console.log('load column names : ' + filetype);

        app.preloader.show();
      var apipage='read_colnames.php';
      var udata= { 
        filetype:  filetype
      }
      $$('#colname')[0].value="";
      app.request.post($base_url+'base/'+apipage ,JSON.stringify(udata),(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.collist=data;
        var ListEl = app.autocomplete.create({
          inputEl: '.colname',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#colid')[0].value="";
            // $$('#colname')[0].value="";
            reclist=app.data.collist.records;
            // console.log(reclist)
            for (var i = 0; i < reclist.length; i++) {
              if (reclist[i].colname.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                // console.log(reclist[i]);
                results.push({ "id": reclist[i].colname,"name":   reclist[i].colname} ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              //  console.log( value);
              // $$('#papsdesc')[0].value="";
              $$('#colid')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#colname')[0].value=value[i].name;
                $$('#colid')[0].value=value[i].id;
                //change inout type if date
                if (value[i].name.toLowerCase().indexOf("date")>=0) {
                 
                  $$('#colvalue')[0].style.display='none';
                  $$('#coldaterange')[0].style.display='';
      
                } else {
                 
                  $$('#colvalue')[0].style.display='';
                  $$('#coldaterange')[0].style.display='none';
                }
               
              
               
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
       
        app.preloader.hide();
      });










      } catch (err) {
         console.log(err.message);
         app.preloader.hide();
      }
     
    },
    loadctcolnames: function(){
      try {
        var ctable=$$('#my-upload-form [name="ctable"]')[0].value
        console.log('load column names : ' + ctable);

        app.preloader.show();
      var apipage='read_ctcolumns.php';
      var udata= { 
        ctable:  ctable
      }
      $$('#colname')[0].value="";
      app.request.post($base_url+'base/'+apipage ,JSON.stringify(udata),(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.collist=data;
        var ListEl = app.autocomplete.create({
          inputEl: '.colname',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#colid')[0].value="";
            // $$('#colname')[0].value="";
            reclist=app.data.collist.records;
            // console.log(reclist)
            for (var i = 0; i < reclist.length; i++) {
              if (reclist[i].colname.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                // console.log(reclist[i]);
                results.push({ "id": reclist[i].colname,"name":   reclist[i].colname} ); //
                 
                
              }
            }
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              //  console.log( value);
              // $$('#papsdesc')[0].value="";
              $$('#colid')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#colname')[0].value=value[i].name;
                $$('#colid')[0].value=value[i].id;
                //change inout type if date
                if (value[i].name.toLowerCase().indexOf("date")>=0) {
                 
                  $$('#colvalue')[0].style.display='none';
                  $$('#coldaterange')[0].style.display='';
      
                } else {
                 
                  $$('#colvalue')[0].style.display='';
                  $$('#coldaterange')[0].style.display='none';
                }
               
              
               
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
       
        app.preloader.hide();
      });










      } catch (err) {
         console.log(err.message);
         app.preloader.hide();
      }
     
    },
    
    fetchvatmatrix: function () {
      //continue to dashboard
      app.preloader.show();
      // var udata= { 
      //   "schguid":app.data.userdata.schguid
      // }
      
      app.request.post($base_url+'vatmatrix/read_matrix.php' ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.vatmatrix=data.records[0];
      }
      );
      // app.methods.fetchsigninroles();
    },
    fetchschrequests: function (schguid) {
      var self = this;
      //continue to dashboard
      app.preloader.show();

      var udata= { 
        schguid:schguid
          }
        

      app.request.post($base_url+'mooerequests/read_approved.php' , JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        // app.$setState({
        //   sdolist: data   
        // })
        app.data.reqlist=data;
        var sdolistel = app.autocomplete.create({
          inputEl: '.reqdesc',
          openIn: 'dropdown',
          valueProperty: 'id',
          textProperty: 'name',
          closeOnSelect: true,
          source: function (query, render) {
            var results = [];
            // if (query.length === 0) {
            //   render(results);
            //   return;
            // }
            // Find matched items
            // $$('#divdescription')[0].value="";
            $$('#requestid')[0].value="";
            reqlist=app.data.reqlist.records;
            // console.log(sdolist)
            try {
              for (var i = 0; i < reqlist.length; i++) {
                if (reqlist[i].reqdesc.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                  results.push({ "id": reqlist[i].requestid,"name":  reqlist[i].reqdesc,"paps":  reqlist[i].paps,
                                 "papsdesc":  reqlist[i].papsdesc,"totalamount":  reqlist[i].totalamount ,
                                 "gaafield":  reqlist[i].gaafield ,
                                 "acctdesc":  reqlist[i].acctdesc ,
                                 "schacctguid":  reqlist[i].schacctguid ,
                                 "ES":  reqlist[i].ES ,
                                 "JHS":  reqlist[i].JHS ,
                                 "SHS":  reqlist[i].SHS ,
                                } ); //
                  
                  
                }
              }
            } catch {

            }
            
            // Render items by passing array with result items
            //  console.log(results)
            render(results);
          },
          on: {
            change: function (value) {
              var itemText = [],
                  inputValue = [];
              // console.log('change triggered');
              // $$('#papsdesc')[0].value="";
              $$('#requestid')[0].value="";
              for (var i = 0; i < value.length; i++) {
                // itemText.push(value[i].name);
                // inputValue.push(value[i].id);
                $$('#reqdesc')[0].value=value[i].name;
                $$('#requestid')[0].value=value[i].id;
                $$('#papsdesc')[0].value=value[i].papsdesc;
                $$('#paps')[0].value=value[i].paps;
                $$('#gaafield')[0].value=value[i].gaafield;
                $$('#acctdesc')[0].value=value[i].acctdesc;
                $$('#schacctguid')[0].value=value[i].schacctguid;
                $$('#totalamount')[0].value=value[i].totalamount;
                var es=value[i].ES;
                var jhs=value[i].JHS;
                var shs=value[i].SHS;
                app.methods.fetchpaplist(false,es,jhs,shs);
                
              } 
              
            },
            close: function(value){
              // console.log(value)

            },
          },  
          });
        // console.log(sdolistel);
        app.preloader.hide();
      });
      // app.methods.fetchsigninroles();
    },
    signin: function () {

      
          // console.log(profile.getId());
          // console.log(profile.getName());
          // console.log(profile.getGivenName());
          // console.log(profile.getFamilyName());
          // console.log(profile.getImageUrl());
          // profile.getEmail();

      app.preloader.show();
      var udata= { 
        "gusername":app.data.googleprofile.getEmail(),
        "gpassword":app.data.googleprofile.getId(),
        "glastname":app.data.googleprofile.getFamilyName(),
        "gfirstname":app.data.googleprofile.getGivenName(),
        "gmiddlename":"",
        "gemail":app.data.googleprofile.getEmail(),
        "gmobile":"",
        "gfbid":"",
        "ggoogleid":app.data.googleprofile.getId(),
        "gaddress1":"",
        "gaddress2":"",
        "gcountry":"",
        "googletoken":app.data.googletoken
      }
      
      app.request.post($base_url+'sysusers/signin.php'+$base_param, JSON.stringify(udata) ,(data)=> {
        data=JSON.parse(data)
        app.data.userdata=data;
        app.preloader.hide();

        //validate profile if division and school id is in data base

        if (data.gstatus==""){
          //show signup screen  
          app.methods.fetchsreglist();
          app.loginScreen.open('#my-divisioncode-screen');
          
          app.preloader.show();
          // app.data.sdolist=data;
          //Populate SDO List
          
          // app.preloader.hide();

        } else {
          //validate use status 
          if (data.gstatus=='N'){
            app.dialog.alert("Your access is still pending. <br/> Please wait for an approval notification via email",function(){location.reload();});
          } else {
            app.methods.continue();
          }
          

        }


      });
    },
    isNormalInteger: function (str) {
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    },
    onBackKeyDown: function() {

            var cpage = homeView.activePage;
            var cpagename = cpage.name;
            // console.log(cpagename);
            if (($$('#leftpanel').hasClass('active')) || ($$('#rightpanel').hasClass('active'))) { // #leftpanel and #rightpanel are id of both panels.
                app.closePanel();
                return false;
            } else if ($$('.modal-in').length > 0) {
                app.closeModal();
                return false;
            } else if (cpagename == 'index') {
                    app.confirm('Are you sure you want to exit?', function() {
                    // var deviceType = device.platform;
                    // if(deviceType == “Android” || deviceType == “android”){
                    navigator.app.exitApp();
                    // }
                },
                function() {
                });
            } else {
              homeView.router.back();
            }

    },
    
  //end App root Methods  
  },
  // App routes
  routes: routes,
});


function fixCols() {
  setTimeout(function() {
    $$('.events-col').css('height', $$('.charts-col').height() + 'px');
  });
}
fixCols();
$$(window).on('resize', fixCols);
// // Init/Create views
// var homeView = app.views.create('#view-home', {
//   url: '/'
// });
var mainView = app.views.create('.view-main', {
  url: '/login/'
});




    
Template7.registerHelper('fnumber',function(val){
  val=parseFloat(val).toFixed(2);
  return Number(val).toLocaleString('en');//val.split("").reverse().join("");
});



Template7.registerHelper('showrec',function(prop){
  for (const [key, value] of Object.entries(app.tempobj)) {
    if (prop==key){ 
      return value;
    }
    console.log(`${key}: ${value}`);
  }
  
});

Template7.registerHelper('savetemp',function(obj){
  app.tempobj=obj;
  return "";
  // return obj[prop];
});


// clientId  = '1071367696181-41hguqf1j44kmgv2opo3esu2ip4dfr05.apps.googleusercontent.com'


document.addEventListener('deviceready', deviceReady, false);

//Load Data 

 
function deviceReady() {
    //I get called when everything's ready for the plugin to be called!
    console.log('Device is ready!');
    // window.plugins.googleplus.trySilentLogin(...);
    
}
// function Contine() {
   
//   //continue to dashboard
//   // app.views.main.router.navigate('/dashboard/')
// }
// function createsdolist() {

// }



