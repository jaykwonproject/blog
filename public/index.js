function size(){$('#land').hide();
    $(document).ready(function(){
        var mq = window.matchMedia( "(orientation:landscape)" );
        if (mq.matches) {
          
            $('#land').hide();
        }
       else{
        $('.wrapper').hide();
        $('#land').show();
       }
    });
    
}

function newsize(){
    $(document).ready(function(){
        var newlist = window.matchMedia("(max-height: 410px)");
    
       if (newlist.matches){
        $('#lists').css("height","70%");
       }
    });
    
}
function home(){
 
        $('#visitor').hide();
        $('#setting').hide();
        $('#blog').hide();
        $('#blog_edit').hide();
        $('.box10').show();
        $('.box7').css("grid-row","2/8");
        $('#room').show();
        $('.box9').show();
        $('#hi').show();
        $('.box6').css("grid-row","2/6");
        $('#list_post').hide();
        $('#posts').hide();
        $('#miniroom').show();
        $('#admin_post').hide();
        $('#list_post2').hide(); 
        $('#posts2').hide();
        
                
}

function blog(){

    $('#room').hide();
    $('#setting').hide();
    $('.box10').hide();
    $('.box7').css("grid-row","2/10");
    $('.box9').hide();
    $('#hi').hide();
    $('.box6').css("grid-row","2/10");
    $('#visitor').hide();
    $('#list_post').show();
    $('#posts').hide();
    $('#miniroom').hide();
    $('#admin_post').hide();
    $('#blog_edit').hide(); 
    $('#list_post2').hide(); 
    $('#posts2').hide();
    firebase.firestore().collection('User').doc('Admin').get().then(function(snap){  
        var admin = (snap.data().name);
        var user = firebase.auth().currentUser;
    
        if (user && user.uid==admin) {
            $('#admin_post').show();
            $("#list_post").css("height", "80%");
          } else {
            $('#blog_edit').hide(); 
            
          }
    
    })
  
}

function blog2(){
    
    $('#room').hide();
    $('#setting').hide();
    $('.box10').hide();
    $('.box7').css("grid-row","2/10");
    $('.box9').hide();
    $('#hi').hide();
    $('.box6').css("grid-row","2/10");
    $('#visitor').hide();
    $('#list_post').hide();
    $('#posts').hide();
    $('#miniroom').hide();
    $('#admin_post').hide();
    $('#blog_edit').hide(); 
    $('#list_post2').show(); 
    $('#posts2').hide();
    firebase.firestore().collection('User').doc('Admin').get().then(function(snap){  
        var admin = (snap.data().name);
        var user = firebase.auth().currentUser;
    
        if (user && user.uid==admin) {
            $('#admin_post').show();
            $("#list_post2").css("height", "80%");
          } else {
            $('#blog_edit').hide(); 
            
          }
    
    })
  
}

function visitor(){
   
        $('#room').hide();
        $('#blog').hide();
        $('#blog_edit').hide();
        $('#setting').hide();
        $('.box10').hide();
        $('.box7').css("grid-row","2/10");
        $('#visitor').show();
        $('#list_post').hide();
        $('#posts').hide();
        $('#hi').show();
        $('.box9').show();
        $('.box6').css("grid-row","2/6");
        $('#miniroom').hide();
        $('#admin_post').hide();
        $('#list_post2').hide(); 
    $('#posts2').hide();
}

function setting(){
        $('#room').hide();
        $('#blog').hide();
        $('#blog_edit').hide();
        $('#visitor').hide();
        $('.box10').hide();
        $('.box7').css("grid-row","2/10");
        $('#setting').show();    
        $('#list_post').hide();    
        $('#posts').hide();   
        $('#hi').show();
        $('.box9').show();
        $('.box6').css("grid-row","2/6");
        $('#miniroom').hide();
        $('#admin_post').hide();
        $('#list_post2').hide(); 
    $('#posts2').hide();
}




function visitCount(){
    const countEl = document.getElementById('count');
    fetch('https://api.countapi.xyz/update/minihome/websiteid/?amount=1').then(
        res => res.json().then(
            res => {
                countEl.innerHTML = 'Total Visit : '+res.value ;
            })
    )
}
function login(){

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result =>{
   
    const user = result.user;
    firebase.firestore().collection('User').doc('Admin').get().then(function(snap){  
        var admin = (snap.data().name);
        if(user.uid==admin){
            $('#login').hide();
            $('#admin1').hide();
            $('#logout').show();
            $('#admin2').show();
        }
           
        else{
            alert('여긴 관리자만 들어갈수있어요..');
            $("p").click(function(){
                alert("no!");
              });
        }
    })
    }).catch(console.log)

    
}


function logout(){
    firebase.auth().signOut()
    .then(function() {
        $('#logout').hide();
        $('#admin2').hide();
        $('#login').show();
        $('#admin1').show();
        
    })
    .catch(function(error) {
      // An error happened
    });
}
function abc(){
    
    firebase.firestore().collection('User').doc('Admin').get().then(function(snap){  
        var admin = (snap.data().name);
        var user = firebase.auth().currentUser;
    
        if (user && user.uid==admin) {
          document.getElementById("btn_post").addEventListener("click", btnPost);
          } else {
           alert("don't do this plz"); 
            
          }
    
    })
  



}
function btnPost(){


    firebase.firestore().collection('User').doc('Admin').get().then(function(snap){  
        var admin = (snap.data().name);
        var user = firebase.auth().currentUser;
    
        if (user && user.uid==admin) {
            var type = $('#txt_type').val();
            var txt_title = $('#txt_title').val();
            var txt_post  = CKEDITOR.instances['txt_post'].getData();
            var css = CKEDITOR.getCss();
            var txt_time =  Date.now();
            var currentdate = new Date(); 
            var txt_date =  currentdate.getFullYear()+"."+(currentdate.getMonth()+1)+"."+currentdate.getDate();    
           
            if (txt_title && txt_post != "") {
                    firebase.firestore().collection(type).add({
                        title: txt_title,
                        post: txt_post,
                        time: txt_time,
                        date: txt_date,
                        style : css
                    })
                alert("successfully posted");
            }else{
                alert("write something first"); 
            }
          } 
          
          else {
            alert("don't do this plz");
            
          }
    
    })
   
}
function adminPost(){
     $('#admin_post').hide();
     $("#list_post").hide();
     $("#list_post2").hide();
     $('#blog_edit').show(); 
}

function btnComment(){
    var txt_guest = $('#guest').val();
    var txt_comment = $('#comment').val();
    var txt_time =  Date.now();
    var currentdate = new Date(); 
    var txt_date =  currentdate.getFullYear()+"."+(currentdate.getMonth()+1)+"."+currentdate.getDate();    
   
    if (txt_guest && txt_comment != "") {
            firebase.firestore().collection('Comment').add({
                guest: txt_guest,
                comment: txt_comment,
                time: txt_time,
                date: txt_date
            })
        alert("successfully posted");
    }else{
        alert("write something first");
    }
}


function posting(){
    $(document).ready(function(){
        const postlist = document.querySelector('#list_post');
        const writing = document.querySelector('#posts');
        firebase.firestore().collection('Blog').orderBy('time').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
            let li = document.createElement('li');
            let title = document.createElement('button');
            let post = doc.data().post;
            let time = document.createElement('button');

            li.setAttribute('data-id', doc.id);
            title.setAttribute('id','btn_title');
            time.setAttribute('id','timestamp');
            
            title.textContent = doc.data().title;
            time.textContent = doc.data().date;

            
            li.appendChild(time);
            li.appendChild(title);
            postlist.prepend(li);
           
               //각 타이틀한테 알맞는 링크를 줘야함..
           title.onclick= function(){
              $('#list_post').hide();
              $('#admin_post').hide();
              writing.innerHTML = post;
              $('#posts').show();   
            }
         })
       })
      });
}

function plan(){
    $('#list_post').hide();
    $('#admin_post').hide();
    $('#list_post2').show();
    $(document).ready(function(){
       
        const postlist2 = document.querySelector('#list_post2');
        const writing2 = document.querySelector('#posts2');
        firebase.firestore().collection('Plan').orderBy('time').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
            let li2 = document.createElement('li');
            let title2 = document.createElement('button');
            let post2 = doc.data().post;
            let time2 = document.createElement('button');

            li2.setAttribute('data-id', doc.id);
            title2.setAttribute('id','btn_title');
            time2.setAttribute('id','timestamp');
            
            title2.textContent = doc.data().title;
            time2.textContent = doc.data().date;

            
            li2.appendChild(time2);
            li2.appendChild(title2);
            postlist2.prepend(li2);
           
               //각 타이틀한테 알맞는 링크를 줘야함..
           title2.onclick= function(){
              $('#list_post2').hide();
              $('#admin_post').hide();
              writing2.innerHTML = post2;
              $('#posts2').show();   
            }
         })
       })
      });
}



function newest(){
    $(document).ready(function(){
        const postlist = document.querySelector('#lists');
        const writing = document.querySelector('#posts');
        firebase.firestore().collection('Blog').orderBy('time','desc').limit(5).get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
            let li = document.createElement('li');
            let a = document.createElement('button');
            let post = doc.data().post;
            let time = document.createElement('button');
            li.setAttribute('data-id', doc.id);
            time.setAttribute('id','hometimestamp');
            a.setAttribute('id','hometitle');
            a.textContent = doc.data().title;
            time.textContent = doc.data().date;

           
            li.appendChild(time);
            li.appendChild(a);
            postlist.append(li);
           
               //각 타이틀한테 알맞는 링크를 줘야함..
           a.onclick= function(){
            $('#room').hide();
            $('#setting').hide();
            $('.box10').hide();
            $('.box7').css("grid-row","2/10");
            $('.box9').hide();
            $('#hi').hide();
            $('.box6').css("grid-row","2/10");
            $('#visitor').hide();
            $('#list_post').hide();
            $('#miniroom').hide();
            $('#posts').show();
            $('#admin_post').hide();
            $('#list_post2').hide(); 
            $('#posts2').hide();
              writing.innerHTML = post;
            }
         })
       })
      });
}


function comment(){
    $(document).ready(function(){
             
        const comSec = document.querySelector('#comments');
        firebase.firestore().collection('Comment').orderBy('time').get().then(( snapshot)=>{
        snapshot.docs.forEach(doc=>{
            let li = document.createElement('li');
            let com = document.createElement('button');
            let guest = document.createElement('button');
            let time = document.createElement('button');
     

            li.setAttribute('data-id', doc.id);
            com.setAttribute('id','btn_com');
            time.setAttribute('id','com_time');
            guest.setAttribute('id','btn_guest');

            
           
            guest.textContent = doc.data().guest;
            time.textContent = doc.data().date;
            com.textContent = doc.data().comment;
            
            
            li.appendChild(guest);
            li.appendChild(time);   
            li.appendChild(com);
           
            comSec.prepend(li);
          
         })
       })
      });
      
}


