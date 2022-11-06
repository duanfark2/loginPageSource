import './style.css'

let myHeader = new Headers();
let jsonResult;

window.login = (username, passwd, handler = () => {
    console.log('OK')
}, ngHandler = () => {
    console.log('wrong password')
}, errHandler = (e) => {
    console.log(e)
}) => {
    fetch("https://db-api.amarea.cn/users?id=" + username,
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data[0].password == passwd) {
                handler(data)
            } else {
                ngHandler()
            }
        })
        .catch((e) => {
            errHandler(e)
        })
}


let UserNameBox = document.getElementById('username')
let pswdBox = document.getElementById("password")
let flag0 = true
let flag1 = true


let addAllEventLisers = () => {


    UserNameBox.addEventListener('focusin', (e) => {
        if (flag0)
            UserNameBox.style.border = '2px solid orange';
        else
            ;
    })

    UserNameBox.addEventListener('focusout', (e) => {
        if (flag0)
        UserNameBox.style.border = '1px solid lightgrey';
        else
            ;
    })



    pswdBox.addEventListener('focusin', (e) => {
        if (flag1)
        pswdBox.style.border = '2px solid orange';
        else
            pswdBox.style.border = '2px solid red';
    })

    pswdBox.addEventListener('focusout', (e) => {
        if(flag1)
        pswdBox.style.border = '1px solid lightgrey';
        else
            pswdBox.style.border = '1px solid red';
    })
}

addAllEventLisers();

let loginButton = document.getElementById('loginButton')

loginButton.onclick = (e) => {
    let jumpToOKPage = (data) => {
        console.log(data);
        location.replace("https://duanfark2.github.io/NotebookTest/?userID=" + data[0].id + "&userName=" + data[0].name)
    }

    let wrongPass = () => {
        pswdBox.style.border = '2px solid red';
        let realpwdBox = document.getElementById('pswdBox')
        let redX = document.createElement('div')
        redX.className='redX';
        redX.innerText = '✖';
        realpwdBox.appendChild(redX)
        flag1 = false;
    }

    let userName = UserNameBox.value;
    let password = pswdBox.value;
    window.login(userName, password, jumpToOKPage, wrongPass)
}

