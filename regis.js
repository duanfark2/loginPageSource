import './regis.css'

let myHeader = new Headers();
let jsonResult;


window.regisTer = (username, nickname, password, OKHandler = (data) => {
    console.log(data)//成功
}, sameNHandler = () => {
    console.log("samename")//重名
}, errHandler = (e) => {
    console.log(e)//错误
}) => {
    fetch("https://db-api.amarea.cn/users?id=" + username,
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
            if (data.length == 0) {
                fetch("https://db-api.amarea.cn/users", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": nickname,
                        "id": username,
                        "password": password
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        OKHandler(data)
                    })
                    .catch((e) => {
                        errHandler(e)
                    })
            } else {
                sameNHandler()
            }
        })
        .catch((e) => {
            errHandler(e)
        })
}

let UserNameBox = document.getElementById('username')
let nicknameBox = document.getElementById('nickname')
let pswdBox = document.getElementById("password")
let flag = [true, true, true]


let addAllEventLisers = () => {


    UserNameBox.addEventListener('focusin', (e) => {
        if (flag[0])
            UserNameBox.style.border = '2px solid orange';
        else
            UserNameBox.style.border = '2px solid red';
    })

    UserNameBox.addEventListener('focusout', (e) => {
        if (flag[0])
            UserNameBox.style.border = '1px solid lightgrey';
        else
            UserNameBox.style.border = '1px solid red';
    })

    nicknameBox.addEventListener('focusin', (e) => {
        if (flag[1])
            nicknameBox.style.border = '2px solid orange';
        else
            nicknameBox.style.border = '2px solid red';
    })

    nicknameBox.addEventListener('focusout', (e) => {
        if (flag[1])
            nicknameBox.style.border = '1px solid lightgrey';
        else
            nicknameBox.style.border = '1px solid red';
    })

    pswdBox.addEventListener('focusin', (e) => {
        if (flag[2])
            pswdBox.style.border = '2px solid orange';
        else
            pswdBox.style.border = '2px solid red';
    })

    pswdBox.addEventListener('focusout', (e) => {
        if(flag[2])
            pswdBox.style.border = '1px solid lightgrey';
        else
            pswdBox.style.border = '1px solid red';
    })
}

addAllEventLisers();

let loginButton = document.getElementById('loginButton')

loginButton.onclick = (e) => {
    let jumpToOKPage = (data) => {
        location.replace("https://duanfark2.github.io/NotebookTest/?userID=" + data.id + "&userName=" + data.name)
    }

    let sameNHandler = () => {
        UserNameBox.style.border = '2px solid red';
        let realuNBox = document.getElementById('nameBox')
        let redT = document.createElement('div')
        redT.className='redT';
        redT.innerText = 'X不可用';
        realuNBox.appendChild(redT)
        flag[0] = false;
    }

    let userName = UserNameBox.value;
    let nickname = nicknameBox.value;
    let password = pswdBox.value;
    window.regisTer(userName, nickname, password, jumpToOKPage, sameNHandler)
}

