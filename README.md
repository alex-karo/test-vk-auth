# Тестовое задание "OAuth VK"

## Задача
Сделать веб приложение, на выбранном вами языке, 
при открытии должно показать кнопку «авторизоваться» 
по нажатию делает oauth авторизацию ВКонтакте, и показывает 
имя авторизованного пользователя после авторизации и 5 любых 
друзей пользователя. При последующих запусках/заходах на 
страницу сразу показывает всю информацию т.к. уже понимает, 
что авторизовано. Бекенд если потребуется, на любой 
технологии на ваш выбор. 

## Реализация
Реализована аутентификация и обращения к VK API через [Open API](https://vk.com/dev/openapi)  
Работает полностью на фронтэнде. Сборка фронтэнда и прочие навороты намеренно не используются.  
В реализации задействованы промисы без полифиллов, посему работает только в современных браузерах.

[DEMO](http://test-oauth.karo-dev.ru/)
