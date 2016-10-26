"use strict";

function simplestTemplate(templateId, data) {
    var resultTemplate = document.getElementById(templateId).innerHTML;
    var dataKeys = Object.keys(data);
    for (var key in dataKeys) {
        var reg = RegExp('%' + dataKeys[key] + '%', 'g');
        resultTemplate = resultTemplate
            .replace(reg, data[dataKeys[key]])
    }
    return resultTemplate;
}

var app = (function () {
    function changeAppState(state) {
        document.body.className = 'state-' + state;
    }

    function getStatus() {
        return new Promise(function(resolve, reject) {
            VK.Auth.getLoginStatus(function(data) {
                if (!data.session) {
                    reject(data);
                }
                resolve(data.session);
            });
        });
    }

    function login() {
        return new Promise(function(resolve, reject) {
            VK.Auth.login(function(data) {
                if (data.status !== 'connected') {
                    reject(data);
                }
                resolve(data.session);
            }, 2);
        });
    }

    function getMyFriends() {
        return new Promise(function(resolve, reject) {
            VK.Api.call('friends.get', {order: 'random', count: 5, fields: 'nickname,photo_100'}, function (data) {
                if (!data.response) {
                    reject(data);
                }
                resolve(data.response);
            });
        });
    }

    function getUserParams(id) {
        console.log(id);
        return new Promise(function(resolve, reject) {
            VK.Api.call('users.get', {user_id: id, fields: 'nickname,photo_100'}, function(data) {
                if(!data.response) {
                    reject(data);
                }
                resolve(data.response[0]);
            });
        });
    }

    function showInfo(userId) {
        getUserParams(userId)
            .then(function (userData) {
                var userHtml = simplestTemplate('user-template', userData);
                document.querySelector('.js-user-info').innerHTML = userHtml;
                return getMyFriends();
            })
            .then(function (friends) {
                var friendsHtml = friends.map(function (friendData) {
                    return simplestTemplate('friend-template', friendData)
                }).join('');
                document.querySelector('.js-friends-list').innerHTML = friendsHtml;
                changeAppState('success');
            })
            .catch(function (e) {
                console.error(e.message);
            });
    }

    function addListeners() {
        document.querySelector('.js-login').addEventListener('click', function () {
            changeAppState('loading');
            login()
                .then(function (session) {
                    console.log(session);
                    showInfo(session.mid);
                })
                .catch(function (e) {
                    console.error(e);
                    changeAppState('error');
                });
        });
    }

    return {
        init: function (id) {
            VK.init({
                apiId: id
            });

            getStatus()
                .then(function (session) {
                    if (!session.sid) {
                        throw new Error('No authorised')
                    }
                    showInfo(session.mid);
                })
                .catch(function () {
                    changeAppState('login');
                    addListeners();
                });
        }
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    window.app.init(5683078);
});