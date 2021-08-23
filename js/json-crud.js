var Res_data;
var UserData = {};



    //Fetching the Data from db.json using json server
    function getDept(){
    fetch("http://localhost:3000/dept").then((res)=>{
    return res.json();
    }).then((dept)=>{

        Res_data = dept.length
        UserData = dept;
        if(dept.length == 0){
            document.getElementById('user_details').innerHTML = ` <tr>
            <td class="text-center" colspan="7">No Data Available</td>
           


  </tr>`
        }
        else{
            for(var i=0; i<dept.length; i++){
            
                document.getElementById('user_details').innerHTML+= ` <tr>
                <th scope="row">`+dept[i].user_name+`</th> 
                <td>`+dept[i].mob_no+`</td>
                <td>`+dept[i].email_id+`</td>
                <td>`+dept[i].role+`</td>
                <td>`+getTime(dept[i].created_ts)+`</td>
                <td>`+getTime(dept[i].last_updated_ts)+`</td>
    
    
         <td><button type="button" title="Edit User" onclick='openModal("2",`+dept[i].id+`)' class="btn mr-1 btn-sm btn-info"><i class="fa fa-edit " aria-hidden="true"></i> </button> <button type="button" title="Delete User" onclick='openModal("3",`+dept[i].id+`)' class="btn mr-1 btn-sm btn-info" ><i class="fa fa-trash-o" aria-hidden="true"></i></button> </td>
      </tr>`
            }
        }
     

    console.log(dept);
    })
    }

    //Creating the Data in db.json using json server

    function AddUser(id){



        var user_id = Res_data+1;
        for(var j=0; j<UserData.length; j++){
            if(user_id == UserData[j].id){
                user_id++;
            }
            
        }

        var user_data =   {
            "id": user_id,
            "user_name": document.getElementById('u_name').value,
            "mob_no": document.getElementById('mb_no').value,
            "email_id":document.getElementById('email').value,
            "role" : document.getElementById('role').value,
            "created_ts": new Date().getTime(),
            "last_updated_ts" : new Date().getTime()
            
          }

      
        fetch("http://localhost:3000/dept",{
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify(user_data)}).then((res)=>{
                return res.json();
                }).then((user_data)=>{

                $('#user_modal').modal('hide')
                
                document.getElementById('alert').innerHTML = `  <div class="alert alert-success " role="alert">
                <i class="fa fa-check mr-1" aria-hidden="true"></i> User Created Successfully
              </div>`

              setTimeout(() => {
                document.getElementById('alert').innerHTML = ""
                getDept();
                window.location.reload();
              }, 1000);
                })
    }

    function EditUser(Current_userobj,id){
        var user_data =   {
            "id": id,
            "user_name": document.getElementById('u_name').value,
            "mob_no": document.getElementById('mb_no').value,
            "email_id":document.getElementById('email').value,
            "role" : document.getElementById('role').value,
            "created_ts": Current_userobj.created_ts,
            "last_updated_ts" : new Date().getTime()

          }
      
          fetch("http://localhost:3000/dept/"+id,{
            method:"PUT",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify(user_data)}).then((res)=>{
                return res.json();
                }).then((user_data)=>{

                $('#user_modal').modal('hide')
                document.getElementById('alert').innerHTML = `  <div class="alert alert-success " role="alert">
                <i class="fa fa-check mr-1" aria-hidden="true"></i> User Updated Successfully
              </div>`

              setTimeout(() => {
                document.getElementById('alert').innerHTML = "";
                getDept()
                window.location.reload();

              }, 1000);
                })
    }
    
    getDept()


    function openModal(type, id){
        if(type == "1"){
            document.getElementById('user_modal_title').innerHTML = 'Add User'
            document.getElementById('btn_submit').innerHTML = 'Add User'

        document.getElementById ('form').reset();

            $('#user_modal').modal('show')

            document.getElementById("form").onsubmit = function() {  
                AddUser(id)  
                };  

     

            
        }
        else if(type == "2"){
            $('#user_modal').modal('show')

            document.getElementById('user_modal_title').innerHTML = 'Edit User'
            document.getElementById('btn_submit').innerHTML = 'Edit User'

            var Current_userobj;
            for(var i=0; i<UserData.length;i++){
                if(id == UserData[i].id){
                    Current_userobj = UserData[i]
                }

            }
            document.getElementById('u_name').value = Current_userobj.user_name
            document.getElementById('email').value = Current_userobj.email_id
            document.getElementById('mb_no').value = Current_userobj.mob_no
            document.getElementById('role').value = Current_userobj.role


            document.getElementById("form").onsubmit = function() {  
                EditUser(Current_userobj,id)  
                };  

            // document.getElementById('btn_submit').addEventListener('click', EditUser())

        

        }
        else if(type == "3"){
            var Current_userobj;
            for(var i=0; i<UserData.length;i++){
                if(id == UserData[i].id){
                    Current_userobj = UserData[i]
                }

            }
            document.getElementById('delete_content').innerHTML = '<span>Are you Sure ? Need to delete the user <strong>'+Current_userobj.user_name+' ('+Current_userobj.email_id+')</strong></span>'
            $('#delete_user_modal').modal('show')
            document.getElementById('delete_btn').addEventListener('click', function(){
                fetch("http://localhost:3000/dept/"+id,{
                    method:"DELETE",
                    headers:{
                    "Content-Type":"application/json"
                    }
                    }).then((res)=>{
                    console.log(res);
            $('#delete_user_modal').modal('hide')

                        document.getElementById('alert').innerHTML = `  <div class="alert alert-success " role="alert">
                        <i class="fa fa-check mr-1" aria-hidden="true"></i> User Deleted Successfully
                      </div>`
                

                  setTimeout(() => {
                    document.getElementById('alert').innerHTML = "";
                    getDept();
                    window.location.reload();

                  }, 1000);
                    })
            })
        }
    }


    function getTime(tstamp){
        var dateC = new Date(tstamp);


        B_Options = {
            month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata' 
          };
          
         return new Intl.DateTimeFormat('en-US', B_Options).format(dateC) ;


      }
      

      function onlyNumberKey(evt) {
          
        // Only ASCII character in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }
    
      