const utils = {
    Constants: {
        CookieNames: {
            userId: "userId",
            username: "username"
        }
    },
    Random: {
        number: function(max){
            if(!max) throw new Error("utils.Random.number needs a max value.");
            return Math.floor(Math.random() * max);
        },
        bool: function(){
            return !!this.number(2);
        },
        letters: function(length = 4){
            let id = "";
            for(let i = 0; i < length; i++){
                id += String.fromCharCode(this.number(26) + 65);
            }
            return id;
        }
    },
    Cookies: {
        get: function(name){
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        set: function(name, value, days){
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        },
        delete: function(name){
            document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        deleteAll: function(exceptionList = ["username"]){
            Object.keys(utils.Constants.CookieNames)
                .filter((name) => exceptionList.includes(name) === false)
                .forEach((name) => this.delete(name));
        }
    }
}

export default utils;